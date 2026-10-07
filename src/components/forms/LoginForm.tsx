"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { loginAction, type ActionState } from "@/actions/auth";

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
      Anmelden
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
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
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm text-ink-soft">
            Passwort
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-beige-dark/40 bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-700">{state.message}</p>
      )}

      <SubmitButton />

      <p className="text-center text-sm text-ink-soft/70">
        Noch kein Konto?{" "}
        <Link href="/register" className="font-medium text-green hover:underline">
          Jetzt registrieren
        </Link>
      </p>
    </form>
  );
}
