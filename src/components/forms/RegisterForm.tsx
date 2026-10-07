"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { registerAction, type ActionState } from "@/actions/auth";

const initialState: ActionState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-green px-8 py-3.5 text-sm font-medium text-white transition-all hover:scale-[1.01] hover:bg-green-dark disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Konto erstellen
    </button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm text-ink-soft">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.name[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-ink-soft">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="text-sm text-ink-soft">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
        {state.fieldErrors?.password && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.password[0]}</p>
        )}
        <p className="mt-1 text-xs text-ink-soft/50">Mindestens 8 Zeichen.</p>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-ink-soft">
        <input type="checkbox" name="newsletter" className="mt-0.5 accent-green" />
        Ich möchte gelegentlich Neuigkeiten & Angebote per E-Mail erhalten.
      </label>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-700">{state.message}</p>
      )}

      <SubmitButton />

      <p className="text-center text-sm text-ink-soft/70">
        Bereits registriert?{" "}
        <Link href="/login" className="font-medium text-green hover:underline">
          Jetzt anmelden
        </Link>
      </p>
    </form>
  );
}
