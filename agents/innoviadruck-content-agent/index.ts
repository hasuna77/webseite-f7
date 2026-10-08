/**
 * innoviadruck-content-agent
 * ----------------
 * Generiert SEO-optimierte Blogartikel-/Ratgeber-Entwürfe für eine
 * Druckerei (Ziel: innoviadruck.de) auf Basis der Keywords und Leistungen
 * aus ./business.ts.
 *
 * Nutzung:
 *   npx tsx agents/innoviadruck-content-agent/index.ts --count 2
 *   npx tsx agents/innoviadruck-content-agent/index.ts --topic "Welches Papier für Flyer?"
 *
 * Voraussetzung: ANTHROPIC_API_KEY in der Umgebung (siehe .env.example).
 * Es wird nichts automatisch veröffentlicht – Entwürfe landen ausschließlich
 * als JSON unter agents/innoviadruck-content-agent/output/. Dieses Repo
 * enthält keine Website für innoviadruck.de, daher gibt es (anders als beim
 * content-agent für F7 Studio) keine --apply-Option.
 *
 * WICHTIG: business.ts enthält aktuell nur Platzhalter-Firmendaten (Stadt,
 * Adresse, genaues Leistungsangebot) – bitte vor dem produktiven Einsatz
 * mit den echten Daten von innoviadruck.de befüllen, sonst generiert Claude
 * Texte mit falschen Fakten.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { askClaudeForJson } from "../shared/anthropic";
import { business, services, seoKeywords } from "./business";

type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  sections: { heading?: string; paragraphs: string[] }[];
};

type Args = { count: number; topic?: string };

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const countIdx = args.indexOf("--count");
  const topicIdx = args.indexOf("--topic");
  return {
    count: countIdx >= 0 ? Number(args[countIdx + 1]) || 1 : 1,
    topic: topicIdx >= 0 ? args[topicIdx + 1] : undefined,
  };
}

function buildSystemPrompt(): string {
  return `Du bist der Content-Stratege von "${business.name}", einer Druckerei (${business.tagline}). Du schreibst deutschsprachige, hilfreiche, konkrete Ratgeber-Artikel für den Firmenblog – kein Marketing-Geschwafel, sondern echte Tipps rund ums Drucken (Papierarten, Formate, Veredelungen, Dateianlieferung, Vorlaufzeiten).

Leistungen: ${services.map((s) => s.title).join(", ")}.
Ziel-Keywords: ${seoKeywords.primary.join(", ")}; lokal/longtail: ${[...seoKeywords.local, ...seoKeywords.longTail].join(", ")}.

Antworte AUSSCHLIESSLICH mit einem JSON-Array. Jedes Element entspricht exakt diesem TypeScript-Typ:

type Post = {
  slug: string;            // kebab-case, nur a-z0-9-, einzigartig
  title: string;
  description: string;     // 1 Satz, für Meta-Description (max 160 Zeichen)
  excerpt: string;         // 1-2 Sätze Teaser
  category: string;        // z.B. "Ratgeber", "Papier & Material", "Veredelung"
  publishedAt: string;     // Format YYYY-MM-DD, heutiges Datum verwenden
  readingMinutes: number;
  sections: { heading?: string; paragraphs: string[] }[]; // 4-7 Abschnitte, erster Abschnitt ohne heading als Einleitung
};

Keine Erklärungen, kein Markdown-Codeblock – nur valides JSON.`;
}

async function main() {
  const { count, topic } = parseArgs();

  const prompt = topic
    ? `Schreibe genau 1 neuen Artikel zum Thema: "${topic}".`
    : `Schlage ${count} neue Artikel-Themen vor und schreibe sie vollständig aus. Orientiere dich an Suchanfragen, die potenzielle Druckerei-Kund:innen stellen würden (z. B. rund um Papierwahl, Formate, Dateiformate/Druckdaten, Veredelungen, Mindestauflagen, Lieferzeiten).`;

  console.log(`→ Generiere ${topic ? 1 : count} Artikel-Entwurf/-Entwürfe für ${business.name}...`);

  const generated = await askClaudeForJson<Post[]>({
    system: buildSystemPrompt(),
    prompt,
    maxTokens: 8000,
  });

  const outDir = path.join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });

  for (const post of generated) {
    const outPath = path.join(outDir, `${post.slug}.json`);
    writeFileSync(outPath, JSON.stringify(post, null, 2), "utf8");
    console.log(`✓ Entwurf gespeichert: agents/innoviadruck-content-agent/output/${post.slug}.json`);
  }

  if (generated.length === 0) {
    console.log("Keine Artikel generiert.");
    return;
  }

  console.log(
    `\nFertig. Bitte Inhalte fachlich gegenlesen (Fakten zu Material/Preisen/Lieferzeiten prüfen), bevor sie irgendwo veröffentlicht werden.`
  );
}

main().catch((error) => {
  console.error("✗ innoviadruck-content-agent fehlgeschlagen:", error.message);
  process.exit(1);
});
