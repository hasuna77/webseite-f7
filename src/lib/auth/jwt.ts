import { SignJWT, jwtVerify } from "jose";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export const SESSION_COOKIE = "session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 Tage

function resolveSecret(): Uint8Array {
  const fromEnv = process.env.AUTH_SECRET;
  if (fromEnv && fromEnv.length >= 16) {
    return new TextEncoder().encode(fromEnv);
  }

  // Entwicklungs-Fallback: persistentes, zufälliges Secret lokal ablegen,
  // damit Sessions Server-Neustarts überleben. In Produktion bitte
  // AUTH_SECRET per Umgebungsvariable setzen (siehe .env.example).
  const dir = path.join(process.cwd(), ".data");
  const secretPath = path.join(dir, "auth-secret.key");
  mkdirSync(dir, { recursive: true });
  if (!existsSync(secretPath)) {
    writeFileSync(secretPath, randomBytes(48).toString("hex"), { mode: 0o600 });
  }
  return new TextEncoder().encode(readFileSync(secretPath, "utf8"));
}

const secret = resolveSecret();

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: string;
};

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.sub !== "string") return null;
    return {
      sub: payload.sub,
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      role: String(payload.role ?? "customer"),
    };
  } catch {
    return null;
  }
}
