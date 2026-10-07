/**
 * Posting-Agent
 * ----------------
 * Erstellt plattformgerechte Social-Media-Captions (Instagram, Facebook,
 * LinkedIn) aus einem Blogartikel oder einem freien Thema und kann sie –
 * sofern die nötigen API-Zugänge gesetzt sind – auch direkt veröffentlichen.
 *
 * Nutzung (nur Captions erzeugen, Standard = Dry-Run):
 *   npx tsx agents/posting-agent/index.ts --slug fotostudio-duesseldorf-worauf-achten
 *   npx tsx agents/posting-agent/index.ts --topic "Neue Öffnungszeiten im Dezember"
 *
 * Wirklich posten (nur mit gesetzten Zugangsdaten, siehe .env.example):
 *   npx tsx agents/posting-agent/index.ts --topic "..." --live --platforms facebook
 *
 * WICHTIG: Instagram verlangt zwingend ein Bild (Graph API), LinkedIn
 * verlangt ein Organization-Access-Token mit Posting-Rechten. Ohne diese
 * Voraussetzungen überspringt der Agent die jeweilige Plattform und erklärt
 * warum – es wird nie unbemerkt nichts gepostet.
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { askClaudeForJson } from "../shared/anthropic";
import { business, posts } from "../shared/context";

type Captions = {
  instagram: string;
  facebook: string;
  linkedin: string;
};

type Args = {
  slug?: string;
  topic?: string;
  sourceFile?: string;
  platforms: string[];
  live: boolean;
  image?: string;
};

function parseArgs(): Args {
  const a = process.argv.slice(2);
  const get = (flag: string) => {
    const i = a.indexOf(flag);
    return i >= 0 ? a[i + 1] : undefined;
  };
  const platforms = get("--platforms")?.split(",") ?? ["instagram", "facebook", "linkedin"];
  return {
    slug: get("--slug"),
    topic: get("--topic"),
    sourceFile: get("--source"),
    platforms,
    live: a.includes("--live"),
    image: get("--image"),
  };
}

function resolveTopicContext(args: Args): { title: string; summary: string; url?: string } {
  if (args.slug) {
    const post = posts.find((p) => p.slug === args.slug);
    if (!post) throw new Error(`Kein Artikel mit Slug "${args.slug}" gefunden.`);
    return { title: post.title, summary: post.excerpt, url: `${business.domain}/blog/${post.slug}` };
  }
  if (args.sourceFile) {
    const raw = JSON.parse(readFileSync(args.sourceFile, "utf8"));
    return {
      title: raw.title,
      summary: raw.excerpt ?? raw.description,
      url: raw.slug ? `${business.domain}/blog/${raw.slug}` : undefined,
    };
  }
  if (args.topic) {
    return { title: args.topic, summary: args.topic };
  }
  throw new Error("Bitte --slug, --source oder --topic angeben.");
}

async function generateCaptions(context: {
  title: string;
  summary: string;
  url?: string;
}): Promise<Captions> {
  return askClaudeForJson<Captions>({
    system: `Du schreibst Social-Media-Captions für "${business.name}", ein Fotostudio in ${business.address.city} (NRW). Ton: warm, professionell, nicht reißerisch. Nutze passende, aber sparsame Emojis und relevante deutsche Hashtags (inkl. Standort-Hashtags wie #FotostudioDüsseldorf #FotografNRW).

Antworte NUR mit JSON in genau dieser Form:
{"instagram": "...", "facebook": "...", "linkedin": "..."}

- instagram: max 2.200 Zeichen, mit 5-10 Hashtags am Ende
- facebook: etwas länger erzählend, max 2 Hashtags
- linkedin: sachlicher/professioneller Ton, kein Hashtag-Spam (max 3)`,
    prompt: `Thema: ${context.title}\nZusammenfassung: ${context.summary}${
      context.url ? `\nLink: ${context.url}` : ""
    }`,
  });
}

async function postToFacebook(message: string): Promise<void> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) {
    console.log("⏭  Facebook übersprungen: FACEBOOK_PAGE_ACCESS_TOKEN / FACEBOOK_PAGE_ID fehlen.");
    return;
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, access_token: token }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("✗ Facebook-Post fehlgeschlagen:", data);
    return;
  }
  console.log("✓ Auf Facebook veröffentlicht:", data.id);
}

async function postToInstagram(caption: string, imageUrl?: string): Promise<void> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !igUserId) {
    console.log(
      "⏭  Instagram übersprungen: FACEBOOK_PAGE_ACCESS_TOKEN / INSTAGRAM_BUSINESS_ACCOUNT_ID fehlen."
    );
    return;
  }
  if (!imageUrl) {
    console.log(
      "⏭  Instagram übersprungen: Die Instagram Graph API erfordert ein Bild. Mit --image <öffentliche-Bild-URL> erneut versuchen."
    );
    return;
  }

  const createRes = await fetch(
    `https://graph.facebook.com/v21.0/${igUserId}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl, caption, access_token: token }),
    }
  );
  const createData = await createRes.json();
  if (!createRes.ok) {
    console.error("✗ Instagram-Container fehlgeschlagen:", createData);
    return;
  }

  const publishRes = await fetch(
    `https://graph.facebook.com/v21.0/${igUserId}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creation_id: createData.id, access_token: token }),
    }
  );
  const publishData = await publishRes.json();
  if (!publishRes.ok) {
    console.error("✗ Instagram-Veröffentlichung fehlgeschlagen:", publishData);
    return;
  }
  console.log("✓ Auf Instagram veröffentlicht:", publishData.id);
}

async function postToLinkedIn(text: string): Promise<void> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgUrn = process.env.LINKEDIN_ORG_URN; // z.B. "urn:li:organization:12345678"
  if (!token || !orgUrn) {
    console.log("⏭  LinkedIn übersprungen: LINKEDIN_ACCESS_TOKEN / LINKEDIN_ORG_URN fehlen.");
    return;
  }

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: orgUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "NONE",
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });

  if (!res.ok) {
    console.error("✗ LinkedIn-Post fehlgeschlagen:", await res.text());
    return;
  }
  console.log("✓ Auf LinkedIn veröffentlicht.");
}

async function main() {
  const args = parseArgs();
  const context = resolveTopicContext(args);

  console.log(`→ Generiere Captions für: "${context.title}"`);
  const captions = await generateCaptions(context);

  const outDir = path.join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${Date.now()}-captions.json`);
  writeFileSync(outPath, JSON.stringify({ context, captions }, null, 2), "utf8");
  console.log(`✓ Captions gespeichert: ${path.relative(process.cwd(), outPath)}`);

  console.log("\n--- Vorschau ---");
  for (const platform of args.platforms) {
    console.log(`\n[${platform.toUpperCase()}]`);
    console.log(captions[platform as keyof Captions] ?? "(keine Caption generiert)");
  }

  if (!args.live) {
    console.log(
      "\nDRY RUN: Es wurde nichts veröffentlicht. Mit --live tatsächlich posten (benötigt API-Zugangsdaten, siehe .env.example)."
    );
    return;
  }

  console.log("\n--- Live-Veröffentlichung ---");
  if (args.platforms.includes("facebook")) await postToFacebook(captions.facebook);
  if (args.platforms.includes("instagram")) await postToInstagram(captions.instagram, args.image);
  if (args.platforms.includes("linkedin")) await postToLinkedIn(captions.linkedin);
}

main().catch((error) => {
  console.error("✗ Posting-Agent fehlgeschlagen:", error.message);
  process.exit(1);
});
