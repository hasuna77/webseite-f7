import type { Metadata } from "next";
import Link from "next/link";
import { Camera } from "lucide-react";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Konto erstellen",
  description: `Erstelle ein kostenloses Konto bei ${business.name}, um deine Shootings und Anfragen zu verwalten.`,
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-ink p-12 text-white lg:flex">
        <div className="bg-grain absolute inset-0 opacity-50">
          <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-beige/20 blur-[120px]" />
        </div>
        <Link href="/" className="relative flex items-center gap-2 font-display text-xl">
          <Camera className="h-5 w-5 text-green-light" strokeWidth={1.5} />
          {business.name}
        </Link>
        <blockquote className="relative font-display text-3xl italic leading-snug text-beige">
          „Fotografie mit Haltung.“
        </blockquote>
      </div>

      <div className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl text-ink">Konto erstellen</h1>
          <p className="mt-2 text-sm text-ink-soft/70">
            Behalte deine Anfragen und Termine an einem Ort.
          </p>
          <div className="mt-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
