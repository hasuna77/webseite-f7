import type { Metadata } from "next";
import Link from "next/link";
import { Camera } from "lucide-react";
import { LoginForm } from "@/components/forms/LoginForm";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Anmelden",
  description: `Melde dich bei deinem ${business.name}-Konto an, um deine Anfragen und Termine zu verwalten.`,
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-beige p-12 pt-28 lg:flex">
        <div className="bg-grain absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-green/15 blur-[120px]" />
        </div>
        <Link href="/" className="relative flex items-center gap-2 font-display text-xl text-ink">
          <Camera className="h-5 w-5 text-green" strokeWidth={1.5} />
          {business.name}
        </Link>
        <blockquote className="relative font-display text-3xl italic leading-snug text-ink">
          „Bilder, die bleiben.“
        </blockquote>
      </div>

      <div className="flex items-center justify-center bg-paper px-6 pb-24 pt-32">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl text-ink">Willkommen zurück</h1>
          <p className="mt-2 text-sm text-ink-soft/70">
            Melde dich an, um deine Anfragen und Termine zu sehen.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
