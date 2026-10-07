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
      <div className="relative hidden flex-col justify-between bg-ink p-12 text-white lg:flex">
        <div className="bg-grain absolute inset-0 opacity-50">
          <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-green/25 blur-[120px]" />
        </div>
        <Link href="/" className="relative flex items-center gap-2 font-display text-xl">
          <Camera className="h-5 w-5 text-green-light" strokeWidth={1.5} />
          {business.name}
        </Link>
        <blockquote className="relative font-display text-3xl italic leading-snug text-beige">
          „Bilder, die bleiben.“
        </blockquote>
      </div>

      <div className="flex items-center justify-center px-6 py-24">
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
