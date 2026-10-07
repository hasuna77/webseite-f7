import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { business, services } from "@/lib/content/business";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 12;

type ChatMessage = { role: "user" | "assistant"; content: string };

function buildSystemPrompt(): string {
  const serviceList = services
    .map((s) => `- ${s.title}: ab ${s.priceFrom}€, ca. ${s.durationMinutes} Min. – ${s.summary}`)
    .join("\n");

  return `Du bist der freundliche, kompetente Support-Assistent von "${business.name}", einem Fotostudio in ${business.address.city} (NRW). Du antwortest auf Deutsch, bist herzlich, präzise und niemals aufdringlich.

Geschäftsdaten:
- Adresse: ${business.address.street}, ${business.address.zip} ${business.address.city}
- Telefon: ${business.phoneDisplay}
- E-Mail: ${business.email}
- Öffnungszeiten: ${business.openingHours.map((o) => `${o.days} ${o.hours}`).join(", ")}
- Einzugsgebiet: Düsseldorf und Umgebung

Leistungen:
${serviceList}

Regeln:
- Beantworte Fragen zu Leistungen, Preisen, Terminen und Ablauf auf Basis der obigen Daten.
- Wenn du etwas nicht sicher weißt (z. B. konkrete Verfügbarkeit), verweise freundlich auf das Kontaktformular unter /kontakt oder Telefon ${business.phoneDisplay}.
- Fasse dich kurz (max. 4-5 Sätze), außer bei expliziten Detailfragen.
- Du bist kein Ersatz für eine Rechts- oder Vertragsberatung – verweise bei Vertragsfragen an das Studio direkt.
- Erfinde keine Preise oder Zusagen, die nicht aus den Daten hervorgehen.`;
}

function fallbackReply(userMessage: string): string {
  return `Danke für deine Nachricht! Unser KI-Assistent ist aktuell nicht verbunden (es fehlt ein API-Schlüssel). Für eine schnelle Antwort erreichst du uns direkt unter ${business.phoneDisplay} oder ${business.email}, oder über das Kontaktformular auf /kontakt. Deine Frage war: "${userMessage.slice(0, 180)}"`;
}

export async function POST(request: Request) {
  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const message = (body.message ?? "").toString().trim();
  if (!message) {
    return NextResponse.json({ error: "Nachricht fehlt." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Nachricht ist zu lang." },
      { status: 400 }
    );
  }

  const history: ChatMessage[] = Array.isArray(body.history)
    ? body.history
        .filter(
          (m): m is ChatMessage =>
            (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string"
        )
        .slice(-MAX_HISTORY)
    : [];

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(message), configured: false });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_CHAT_MODEL || "claude-sonnet-5-5",
      max_tokens: 500,
      system: buildSystemPrompt(),
      messages: [
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: message },
      ],
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || fallbackReply(message), configured: true });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply:
        "Entschuldige, gerade gibt es ein technisches Problem mit dem Assistenten. Bitte versuche es gleich noch einmal oder schreib uns direkt über /kontakt.",
      configured: true,
      error: true,
    });
  }
}
