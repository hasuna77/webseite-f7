/**
 * Content-Agent
 * ----------------
 * Generiert neue, SEO-optimierte Blogartikel-Entwürfe (im selben Format wie
 * src/lib/content/posts.ts) auf Basis der echten Geschäftsdaten der Website.
 *
 * Nutzung:
 *   npx tsx agents/content-agent/index.ts --count 2
 *   npx tsx agents/content-agent/index.ts --topic "Herbstportraits im Park"
 *   npx tsx agents/content-agent/index.ts --count 1 --apply   # direkt in posts.ts einfügen
 *
 * Voraussetzung: ANTHROPIC_API_KEY in der Umgebung (siehe .env.example).
 * Ohne --apply werden nur Entwürfe unter agents/content-agent/output/
 * gespeichert – nichts wird automatisch veröffentlicht.
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { askClaudeForJson } from "../shared/anthropic";
import { business, services, posts, type Post } from "../shared/context";

type Args = { count: number; topic?: string; apply: boolean };

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const countIdx = args.indexOf("--count");
  const topicIdx = args.indexOf("--topic");
  return {
    count: countIdx >= 0 ? Number(args[countIdx + 1]) || 1 : 1,
    topic: topicIdx >= 0 ? args[topicIdx + 1] : undefined,
    apply: args.includes("--apply"),
  };
}

function buildSystemPrompt(): string {
  return `Du bist der Content-Stratege von "${business.name}", einem Fotostudio in ${business.address.city} (NRW). Du schreibst deutschsprachige, hilfreiche, konkrete Ratgeber-Artikel fürs Studio-Journal – kein Marketing-Geschwafel, sondern echte Tipps mit lokalem NRW-Bezug.

Leistungen: ${services.map((s) => s.title).join(", ")}.
Einzugsgebiet: ${business.address.city} und Umgebung.

Antworte AUSSCHLIESSLICH mit einem JSON-Array. Jedes Element entspricht exakt diesem TypeScript-Typ:

type Post = {
  slug: string;            // kebab-case, nur a-z0-9-, einzigartig
  title: string;
  description: string;     // 1 Satz, für Meta-Description (max 160 Zeichen)
  excerpt: string;         // 1-2 Sätze Teaser
  category: string;        // z.B. "Ratgeber", "Business", "Hochzeit"
  publishedAt: string;     // Format YYYY-MM-DD, heutiges Datum verwenden
  readingMinutes: number;
  sections: { heading?: string; paragraphs: string[] }[]; // 4-7 Abschnitte, erster Abschnitt ohne heading als Einleitung
};

Keine Erklärungen, kein Markdown-Codeblock – nur valides JSON.`;
}

function slugExists(slug: string): boolean {
  return posts.some((p) => p.slug === slug);
}

function applyToPostsFile(newPosts: Post[]) {
  const postsFilePath = path.join(__dirname, "../../src/lib/content/posts.ts");
  const content = readFileSync(postsFilePath, "utf8");
  const marker = "export const posts: Post[] = [";
  const idx = content.indexOf(marker);
  if (idx === -1) {
    throw new Error("Konnte posts.ts nicht automatisch bearbeiten (Marker nicht gefunden).");
  }

  const insertion = newPosts
    .map((p) => "  " + JSON.stringify(p, null, 2).split("\n").join("\n  ") + ",")
    .join("\n");

  const insertAt = idx + marker.length;
  const updated =
    content.slice(0, insertAt) + "\n" + insertion + content.slice(insertAt);

  writeFileSync(postsFilePath, updated, "utf8");
}

async function main() {
  const { count, topic, apply } = parseArgs();

  const existingTitles = posts.map((p) => `- ${p.title} (${p.slug})`).join("\n");
  const prompt = topic
    ? `Schreibe genau 1 neuen Artikel zum Thema: "${topic}".\n\nBereits vorhandene Artikel (nicht duplizieren):\n${existingTitles}`
    : `Schlage ${count} neue Artikel-Themen vor und schreibe sie vollständig aus. Orientiere dich an Suchanfragen, die potenzielle Kund:innen in NRW stellen würden (z. B. rund um Anlässe, Vorbereitung, Preise, Styling).\n\nBereits vorhandene Artikel (nicht duplizieren):\n${existingTitles}`;

  console.log(`→ Generiere ${topic ? 1 : count} Artikel-Entwurf/-Entwürfe...`);

  const generated = await askClaudeForJson<Post[]>({
    system: buildSystemPrompt(),
    prompt,
    maxTokens: 8000,
  });

  const outDir = path.join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });

  const accepted: Post[] = [];
  for (const post of generated) {
    if (slugExists(post.slug) || accepted.some((p) => p.slug === post.slug)) {
      console.warn(`⚠ Slug "${post.slug}" existiert bereits – übersprungen.`);
      continue;
    }
    const outPath = path.join(outDir, `${post.slug}.json`);
    writeFileSync(outPath, JSON.stringify(post, null, 2), "utf8");
    console.log(`✓ Entwurf gespeichert: agents/content-agent/output/${post.slug}.json`);
    accepted.push(post);
  }

  if (accepted.length === 0) {
    console.log("Keine neuen Artikel generiert.");
    return;
  }

  if (apply) {
    applyToPostsFile(accepted);
    console.log(`✓ ${accepted.length} Artikel direkt in src/lib/content/posts.ts eingefügt.`);
    console.log("  Bitte Inhalte fachlich gegenlesen, bevor sie live gehen.");
  } else {
    console.log(
      `\nFertig. Mit --apply fügst du die Entwürfe direkt in src/lib/content/posts.ts ein (danach bitte gegenlesen).`
    );
  }
}

main().catch((error) => {
  console.error("✗ Content-Agent fehlgeschlagen:", error.message);
  process.exit(1);
});
