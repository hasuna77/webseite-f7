import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { listContactMessagesForUser } from "@/lib/db/contact";
import { Container } from "@/components/ui/Container";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { PasswordForm } from "@/components/forms/PasswordForm";
import { MessageSquare, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Mein Konto",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const messages = listContactMessagesForUser(session.sub);

  return (
    <section className="bg-paper-soft pb-24 pt-36 lg:pt-44">
      <Container>
        <h1 className="font-display text-4xl text-ink">Hallo, {session.name.split(" ")[0]}.</h1>
        <p className="mt-2 text-ink-soft/70">
          Verwalte hier dein Profil und sieh deine gesendeten Anfragen.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-beige-dark/30 bg-paper p-7">
              <div className="flex items-center gap-2 text-ink-soft/60">
                <User className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.1em]">Profil</span>
              </div>
              <div className="mt-5">
                <ProfileForm name={session.name} />
              </div>
              <p className="mt-6 text-xs text-ink-soft/50">E-Mail: {session.email}</p>
            </div>

            <div className="rounded-3xl border border-beige-dark/30 bg-paper p-7">
              <div className="flex items-center gap-2 text-ink-soft/60">
                <span className="text-xs uppercase tracking-[0.1em]">Passwort ändern</span>
              </div>
              <div className="mt-5">
                <PasswordForm />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-beige-dark/30 bg-paper p-7">
            <div className="flex items-center gap-2 text-ink-soft/60">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.1em]">Deine Anfragen</span>
            </div>

            {messages.length === 0 ? (
              <p className="mt-5 text-sm text-ink-soft/70">
                Du hast noch keine Anfrage gesendet. Nutze das{" "}
                <a href="/kontakt" className="text-green hover:underline">
                  Kontaktformular
                </a>
                , um uns dein Projekt zu schildern.
              </p>
            ) : (
              <ul className="mt-5 space-y-4">
                {messages.map((m) => (
                  <li key={m.id} className="rounded-2xl bg-paper-soft p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-ink">
                        {m.service || "Allgemeine Anfrage"}
                      </span>
                      <span className="text-xs text-ink-soft/50">
                        {new Date(m.created_at).toLocaleDateString("de-DE")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink-soft/80">{m.message}</p>
                    <span className="mt-3 inline-block rounded-full bg-beige px-3 py-1 text-xs uppercase tracking-wide text-ink-soft/70">
                      {m.status === "new" ? "Eingegangen" : m.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
