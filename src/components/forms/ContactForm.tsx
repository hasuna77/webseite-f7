"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { submitContactAction } from "@/actions/contact";
import type { ActionState } from "@/actions/auth";
import { services } from "@/lib/content/business";

const initialState: ActionState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-8 py-3.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-green-dark disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Nachricht senden
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactAction, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-green/30 bg-green/10 p-6 text-ink-soft">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-ink-soft">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper-soft px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
          />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-red-700">{state.fieldErrors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-ink-soft">
            E-Mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper-soft px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-red-700">{state.fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm text-ink-soft">
            Telefon (optional)
          </label>
          <input
            id="phone"
            name="phone"
            className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper-soft px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
          />
        </div>
        <div>
          <label htmlFor="service" className="text-sm text-ink-soft">
            Gewünschte Leistung
          </label>
          <select
            id="service"
            name="service"
            className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper-soft px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
          >
            <option value="">Bitte wählen</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-ink-soft">
          Deine Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper-soft px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-700">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
