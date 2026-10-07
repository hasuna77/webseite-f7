"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserName,
  updateUserPassword,
} from "@/lib/db/users";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { clearSessionCookie, getSession, setSessionCookie } from "@/lib/auth/session";

export type ActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const registerSchema = z.object({
  name: z.string().trim().min(2, "Bitte gib deinen Namen an.").max(80),
  email: z.string().trim().toLowerCase().email("Bitte gib eine gültige E-Mail-Adresse an."),
  password: z.string().min(8, "Das Passwort muss mindestens 8 Zeichen haben."),
  newsletter: z.union([z.literal("on"), z.literal(null)]).optional(),
});

export async function registerAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    newsletter: formData.get("newsletter"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Bitte überprüfe deine Angaben.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, newsletter } = parsed.data;

  const existing = findUserByEmail(email);
  if (existing) {
    return {
      status: "error",
      message: "Für diese E-Mail-Adresse existiert bereits ein Konto.",
      fieldErrors: { email: ["Diese E-Mail-Adresse wird bereits verwendet."] },
    };
  }

  const passwordHash = await hashPassword(password);
  const user = createUser({
    name,
    email,
    passwordHash,
    newsletterOptIn: newsletter === "on",
  });

  await setSessionCookie({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/dashboard");
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Bitte gib eine gültige E-Mail-Adresse an."),
  password: z.string().min(1, "Bitte gib dein Passwort ein."),
});

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Bitte überprüfe deine Angaben.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;
  const user = findUserByEmail(email);

  // Bewusst dieselbe Fehlermeldung bei unbekannter E-Mail und falschem
  // Passwort, um nicht zu verraten, ob ein Konto existiert.
  const genericError: ActionState = {
    status: "error",
    message: "E-Mail-Adresse oder Passwort ist falsch.",
  };

  if (!user) return genericError;

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return genericError;

  await setSessionCookie({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/");
}

const profileSchema = z.object({
  name: z.string().trim().min(2, "Bitte gib deinen Namen an.").max(80),
});

export async function updateProfileAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getSession();
  if (!session) {
    return { status: "error", message: "Bitte melde dich erneut an." };
  }

  const parsed = profileSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Bitte überprüfe deine Angaben.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  updateUserName(session.sub, parsed.data.name);
  const user = findUserById(session.sub)!;
  await setSessionCookie({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  revalidatePath("/dashboard");

  return { status: "success", message: "Profil wurde aktualisiert." };
}

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Bitte gib dein aktuelles Passwort ein."),
    newPassword: z.string().min(8, "Das neue Passwort muss mindestens 8 Zeichen haben."),
  });

export async function changePasswordAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getSession();
  if (!session) {
    return { status: "error", message: "Bitte melde dich erneut an." };
  }

  const parsed = passwordChangeSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Bitte überprüfe deine Angaben.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const user = findUserById(session.sub)!;
  const valid = await verifyPassword(parsed.data.currentPassword, user.password_hash);
  if (!valid) {
    return {
      status: "error",
      message: "Aktuelles Passwort ist falsch.",
      fieldErrors: { currentPassword: ["Aktuelles Passwort ist falsch."] },
    };
  }

  const newHash = await hashPassword(parsed.data.newPassword);
  updateUserPassword(user.id, newHash);

  return { status: "success", message: "Passwort wurde geändert." };
}
