"use client";

import { useActionState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { changePasswordAction, type ActionState } from "@/actions/auth";

const initialState: ActionState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Passwort ändern
    </button>
  );
}

export function PasswordForm() {
  const [state, formAction] = useActionState(changePasswordAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="text-sm text-ink-soft">
          Aktuelles Passwort
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full max-w-sm rounded-xl border border-beige-dark/40 bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
        {state.fieldErrors?.currentPassword && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.currentPassword[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="newPassword" className="text-sm text-ink-soft">
          Neues Passwort
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-1.5 w-full max-w-sm rounded-xl border border-beige-dark/40 bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-green focus:ring-1 focus:ring-green"
        />
        {state.fieldErrors?.newPassword && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.newPassword[0]}</p>
        )}
      </div>
      {state.message && (
        <p className={`text-sm ${state.status === "error" ? "text-red-700" : "text-green-dark"}`}>
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
