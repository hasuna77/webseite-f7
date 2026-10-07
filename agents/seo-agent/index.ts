/**
 * SEO-Agent
 * ----------------
 * Crawlt die eigene Sitemap, prüft jede Seite auf grundlegende On-Page-SEO-
 * Kriterien (Title, Meta-Description, Canonical, H1, strukturierte Daten,
 * Antwortzeit) und lässt Claude daraus einen priorisierten Maßnahmenplan
 * schreiben – fokussiert auf das Ranking für "Fotostudio" / "Fotograf NRW".
 *
 * Nutzung:
 *   npx tsx agents/seo-agent/index.ts --url http://localhost:3000
 *   npx tsx agents/seo-agent/index.ts --url https://www.f7studio.de
 *
 * Voraussetzung: ANTHROPIC_API_KEY in der Umgebung. Ohne Key wird nur der
 * technische Rohbefund ausgegeben (kein Claude-Report).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { askClaude } from "../shared/anthropic";
import { business, seoKeywords } from "../shared/context";

const MAX_PAGES = 40;
const FETCH_TIMEOUT_MS = 10_000;

type PageAudit = {
  url: string;
  status: number | "error";
  responseMs: number;
  title: string | null;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  hasCanonical: boolean;
  h1Count: number;
  hasStructuredData: boolean;
  wordCount: number;
  issues: string[];
};

function parseArgs() {
  const a = process.argv.slice(2);
  const i = a.indexOf("--url");
  const baseUrl = (i >= 0 ? a[i + 1] : process.env.SITE_URL || business.domain).replace(/\/$/, "");
  return { baseUrl };
}

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function getSitemapUrls(baseUrl: string): Promise<string[]> {
  const res = await fetchWithTimeout(`${baseUrl}/sitemap.xml`, FETCH_TIMEOUT_MS);
  if (!res.ok) throw new Error(`Sitemap nicht erreichbar: ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  // Die Sitemap enthält immer die kanonische Produktions-Domain. Wenn gegen
  // einen anderen Host geprüft wird (z. B. localhost beim Testen), die
  // Pfade auf diesen Host ummünzen, statt die Produktions-URLs zu pingen.
  const targetOrigin = new URL(baseUrl).origin;
  const rewritten = matches.map((loc) => {
    try {
      const url = new URL(loc);
      return `${targetOrigin}${url.pathname}${url.search}`;
    } catch {
      return loc;
    }
  });

  return rewritten.slice(0, MAX_PAGES);
}

function extract(regex: RegExp, html: string): string | null {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

async function auditPage(url: string): Promise<PageAudit> {
  const issues: string[] = [];
  const start = Date.now();

  let res: Response;
  try {
    res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
  } catch {
    return {
      url,
      status: "error",
      responseMs: Date.now() - start,
      title: null,
      titleLength: 0,
      description: null,
      descriptionLength: 0,
      hasCanonical: false,
      h1Count: 0,
      hasStructuredData: false,
      wordCount: 0,
      issues: ["Seite nicht erreichbar (Timeout oder Netzwerkfehler)."],
    };
  }

  const responseMs = Date.now() - start;
  const html = await res.text();

  const title = extract(/<title[^>]*>([^<]*)<\/title>/i, html);
  const description = extract(
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i,
    html
  );
  const hasCanonical = /<link\s+rel=["']canonical["']/i.test(html);
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const hasStructuredData = /application\/ld\+json/i.test(html);
  const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;

  const titleLength = title?.length ?? 0;
  const descriptionLength = description?.length ?? 0;

  if (res.status !== 200) issues.push(`HTTP-Status ${res.status} statt 200.`);
  if (!title) issues.push("Kein <title> gefunden.");
  else if (titleLength < 30 || titleLength > 65)
    issues.push(`Title-Länge ${titleLength} Zeichen (ideal: 30–65).`);
  if (!description) issues.push("Keine Meta-Description gefunden.");
  else if (descriptionLength < 70 || descriptionLength > 165)
    issues.push(`Meta-Description-Länge ${descriptionLength} Zeichen (ideal: 70–165).`);
  if (!hasCanonical) issues.push("Kein Canonical-Tag gefunden.");
  if (h1Count === 0) issues.push("Keine H1-Überschrift gefunden.");
  if (h1Count > 1) issues.push(`${h1Count} H1-Überschriften gefunden (ideal: genau 1).`);
  if (!hasStructuredData) issues.push("Keine strukturierten Daten (JSON-LD) gefunden.");
  if (responseMs > 2000) issues.push(`Langsame Antwortzeit: ${responseMs}ms.`);
  if (wordCount < 150) issues.push(`Wenig Textinhalt (${wordCount} Wörter) – dünn für SEO.`);

  return {
    url,
    status: res.status,
    responseMs,
    title,
    titleLength,
    description,
    descriptionLength,
    hasCanonical,
    h1Count,
    hasStructuredData,
    wordCount,
    issues,
  };
}

async function buildReport(audits: PageAudit[]): Promise<string> {
  const totalIssues = audits.reduce((sum, a) => sum + a.issues.length, 0);
  const summary = audits
    .map(
      (a) =>
        `- ${a.url} — Status ${a.status}, ${a.responseMs}ms, ${a.issues.length} Problem(e)${
          a.issues.length ? ": " + a.issues.join(" | ") : ""
        }`
    )
    .join("\n");

  if (!process.env.ANTHROPIC_API_KEY) {
    return `# SEO-Audit (Rohdaten, ohne KI-Priorisierung)\n\nANTHROPIC_API_KEY fehlt – kein priorisierter Claude-Report möglich.\n\nGeprüfte Seiten: ${audits.length}, Probleme gesamt: ${totalIssues}\n\n${summary}\n`;
  }

  const prompt = `Hier ist ein technischer SEO-Rohbefund von ${audits.length} Seiten der Website von ${business.name} (Ziel-Keywords: ${seoKeywords.primary.join(", ")}; lokal: ${seoKeywords.local.join(", ")}):\n\n${summary}\n\nSchreibe daraus einen priorisierten Maßnahmenplan auf Deutsch in Markdown:\n1. Kritische Probleme zuerst (die das Ranking am meisten beeinträchtigen)\n2. Konkrete, umsetzbare Empfehlungen – keine generischen SEO-Binsenweisheiten\n3. Fokus auf das Ziel, für "Fotostudio", "Fotograf" und "Fotografen Nordrhein-Westfalen" / lokale Stadt-Suchen gut zu ranken\n4. Maximal 15 Punkte, nach Impact sortiert`;

  const claudeReport = await askClaude({
    system:
      "Du bist ein erfahrener technischer SEO-Berater für lokale Dienstleistungsunternehmen in Deutschland.",
    prompt,
    maxTokens: 3000,
  });

  return `# SEO-Audit: ${business.name}\n\nGeprüfte Seiten: ${audits.length} · Probleme gesamt: ${totalIssues} · Datum: ${new Date().toISOString().slice(0, 10)}\n\n## Priorisierter Maßnahmenplan\n\n${claudeReport}\n\n## Rohdaten\n\n${summary}\n`;
}

async function main() {
  const { baseUrl } = parseArgs();
  console.log(`→ Lade Sitemap von ${baseUrl}/sitemap.xml ...`);
  const urls = await getSitemapUrls(baseUrl);
  console.log(`→ ${urls.length} Seiten gefunden. Prüfe jede Seite...`);

  const audits: PageAudit[] = [];
  for (const url of urls) {
    const audit = await auditPage(url);
    audits.push(audit);
    const flag = audit.issues.length === 0 ? "✓" : `⚠ ${audit.issues.length}`;
    console.log(`  ${flag}  ${url}`);
  }

  console.log("\n→ Erstelle priorisierten Report...");
  const report = await buildReport(audits);

  const outDir = path.join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${new Date().toISOString().slice(0, 10)}-report.md`);
  writeFileSync(outPath, report, "utf8");

  console.log(`\n✓ Report gespeichert: ${path.relative(process.cwd(), outPath)}`);
}

main().catch((error) => {
  console.error("✗ SEO-Agent fehlgeschlagen:", error.message);
  process.exit(1);
});
