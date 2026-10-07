import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Galerie",
  description: `Einblicke in Portrait-, Business-, Hochzeits- und Produktfotografie von ${business.name} aus ${business.address.city}.`,
  alternates: { canonical: "/galerie" },
};

const CATEGORIES = [
  { label: "Portrait", gradient: "from-ink via-green-dark to-ink" },
  { label: "Business", gradient: "from-beige-dark via-beige to-paper-soft" },
  { label: "Hochzeit", gradient: "from-green via-green-dark to-ink" },
  { label: "Produkt", gradient: "from-paper-soft via-beige to-beige-dark" },
  { label: "Event", gradient: "from-ink via-ink-soft to-green-dark" },
  { label: "Editorial", gradient: "from-beige via-green-light to-green" },
  { label: "Familie", gradient: "from-green-dark via-ink to-ink-soft" },
  { label: "Architektur", gradient: "from-beige-dark via-paper-soft to-beige" },
  { label: "Studio", gradient: "from-ink via-green-dark to-green" },
];

export default function GaleriePage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-36 text-white lg:pt-44">
        <Container>
          <Eyebrow>Galerie</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-5xl sm:text-6xl">
            Ein Blick in unsere Arbeit.
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            Diese Seite zeigt die Platzhalter-Struktur unserer Galerie. Sobald echte
            Projektbilder vorliegen, ersetzen wir die Flächen unten 1:1 durch Fotos.
          </p>
        </Container>
      </section>

      <section className="bg-ink pb-20 text-white/70">
        <Container className="max-w-2xl text-sm leading-relaxed">
          <p>
            Unsere Galerie gliedert sich in die Bereiche Portrait, Business, Hochzeit, Produkt,
            Event, Editorial, Familie, Architektur und Studio – passend zu den Leistungen, die
            wir in {business.address.city} und ganz Nordrhein-Westfalen anbieten. Du möchtest
            konkrete Referenzbilder zu deinem Anlass sehen? Schreib uns kurz über das{" "}
            <a href="/kontakt" className="text-green-light hover:underline">
              Kontaktformular
            </a>{" "}
            – wir schicken passende Beispiele aus unserem aktuellen Portfolio.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.label}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} ${
                  i % 5 === 0 ? "aspect-[3/4] sm:row-span-2" : "aspect-square"
                }`}
              >
                <div className="bg-grain absolute inset-0 opacity-70" />
                <div className="absolute inset-0 flex items-end p-5">
                  <span className="rounded-full bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                    {cat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
