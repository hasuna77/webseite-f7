import { randomUUID } from "node:crypto";
import { getDb } from "./client";

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  newsletter_opt_in: number;
  created_at: string;
};

export type PublicUser = Pick<User, "id" | "name" | "email" | "role" | "created_at">;

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
}

export function findUserByEmail(email: string): User | undefined {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM users WHERE email = ? COLLATE NOCASE")
    .get(email) as User | undefined;
  return row;
}

export function findUserById(id: string): User | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
}

export function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  newsletterOptIn: boolean;
}): User {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO users (id, name, email, password_hash, newsletter_opt_in)
     VALUES (?, ?, ?, ?, ?)`
  ).run(id, input.name, input.email.toLowerCase(), input.passwordHash, input.newsletterOptIn ? 1 : 0);
  return findUserById(id)!;
}

export function updateUserName(id: string, name: string): void {
  const db = getDb();
  db.prepare("UPDATE users SET name = ? WHERE id = ?").run(name, id);
}

export function updateUserPassword(id: string, passwordHash: string): void {
  const db = getDb();
  db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(passwordHash, id);
}
