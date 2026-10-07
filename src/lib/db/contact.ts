import { randomUUID } from "node:crypto";
import { getDb } from "./client";

export type ContactMessage = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
  created_at: string;
};

export function createContactMessage(input: {
  userId: string | null;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}): ContactMessage {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO contact_messages (id, user_id, name, email, phone, service, message)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.userId,
    input.name,
    input.email,
    input.phone ?? null,
    input.service ?? null,
    input.message
  );
  return db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id) as ContactMessage;
}

export function listContactMessagesForUser(userId: string): ContactMessage[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM contact_messages WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as ContactMessage[];
}
