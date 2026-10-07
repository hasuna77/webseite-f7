import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    newsletter_opt_in INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

function openAt(dbPath: string): DatabaseSync {
  if (dbPath !== ":memory:") {
    mkdirSync(path.dirname(dbPath), { recursive: true });
  }
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(SCHEMA);
  return db;
}

function createConnection(): DatabaseSync {
  // 1) Bevorzugt: beschreibbares Projektverzeichnis (lokale Entwicklung,
  //    klassischer Server mit persistentem Dateisystem).
  try {
    return openAt(path.join(process.cwd(), ".data", "app.db"));
  } catch {
    // Fällt z. B. auf Serverless-Plattformen durch (schreibgeschütztes
    // Deployment-Bundle) – weiter zu Fallback 2.
  }

  // 2) Fallback: /tmp ist auf den meisten Serverless-Plattformen
  //    (Vercel, AWS Lambda) beschreibbar, bleibt aber nur für die
  //    Lebensdauer der Instanz erhalten.
  try {
    const db = openAt(path.join(os.tmpdir(), "lichtraum-fotostudio", "app.db"));
    console.warn(
      "[db] Projektverzeichnis nicht beschreibbar – nutze " +
        "temporäres Verzeichnis. Daten überleben keinen Kaltstart/Redeploy. " +
        "Für dauerhafte Speicherung eine gehostete Datenbank anbinden."
    );
    return db;
  } catch {
    // Auch /tmp nicht verfügbar – letzter Ausweg.
  }

  // 3) Letzter Ausweg: rein im Arbeitsspeicher, nur für die aktuelle
  //    Instanz/Anfrage-Gruppe gültig.
  console.warn(
    "[db] Kein beschreibbares Dateisystem gefunden – nutze eine reine " +
      "In-Memory-Datenbank. Alle Daten gehen bei jedem Kaltstart verloren."
  );
  return openAt(":memory:");
}

declare global {
  var __sqliteDb: DatabaseSync | undefined;
}

export function getDb(): DatabaseSync {
  if (!globalThis.__sqliteDb) {
    globalThis.__sqliteDb = createConnection();
  }
  return globalThis.__sqliteDb;
}
