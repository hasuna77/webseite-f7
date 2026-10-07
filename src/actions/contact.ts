"use server";

import { z } from "zod";
import { createContactMessage } from "@/lib/db/contact";
import { getSession } from "@/lib/auth/session";
import type { ActionState } from "./auth";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Bitte gib deinen Namen an.").max(100),
  email: z.string().trim().toLowerCase().email("Bitte gib eine gültige E-Mail-Adresse an."),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Deine Nachricht darf nicht leer sein.").max(4000),
});

export async function submitContactAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Bitte überprüfe deine Angaben.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();

  createContactMessage({
    userId: session?.sub ?? null,
    ...parsed.data,
  });

  return {
    status: "success",
    message:
      "Danke für deine Nachricht! Wir melden uns in der Regel innerhalb von 24 Stunden bei dir.",
  };
}
