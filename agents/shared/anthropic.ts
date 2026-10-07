import Anthropic from "@anthropic-ai/sdk";

export function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY fehlt. Bitte in .env setzen (siehe .env.example) – ohne Key können die Agents keine Inhalte generieren."
    );
  }
  return new Anthropic({ apiKey });
}

/**
 * Ruft Claude auf und erwartet eine Antwort, die ausschließlich aus JSON
 * besteht. Wirft bei ungültigem JSON einen aussagekräftigen Fehler.
 */
export async function askClaudeForJson<T>(params: {
  system: string;
  prompt: string;
  model?: string;
  maxTokens?: number;
}): Promise<T> {
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: params.model || process.env.ANTHROPIC_CONTENT_MODEL || "claude-sonnet-5-5",
    max_tokens: params.maxTokens ?? 4000,
    system: params.system,
    messages: [{ role: "user", content: params.prompt }],
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("\n")
    .trim();

  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error(`Claude-Antwort enthielt kein erkennbares JSON:\n${text}`);
  }

  try {
    return JSON.parse(jsonMatch[0]) as T;
  } catch (error) {
    throw new Error(
      `Konnte JSON aus Claude-Antwort nicht parsen: ${(error as Error).message}\n\nRohtext:\n${text}`
    );
  }
}

export async function askClaude(params: {
  system: string;
  prompt: string;
  model?: string;
  maxTokens?: number;
}): Promise<string> {
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: params.model || process.env.ANTHROPIC_CONTENT_MODEL || "claude-sonnet-5-5",
    max_tokens: params.maxTokens ?? 2000,
    system: params.system,
    messages: [{ role: "user", content: params.prompt }],
  });

  return response.content
    .filter((block) => block.type === "text")
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("\n")
    .trim();
}
