import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Galerie",
  description: `Einblicke in Portrait-, Business-, Hochzeits- und Produktfotografie von ${business.name} aus ${business.address.city}.`,
  alternates: { canonical: "/galerie" },
};

const CATEGORIES = [
  { label: "Portrait", gradient: "from-beige-dark via-beige to-paper-soft" },
  { label: "Business", gradient: "from-paper-soft via-white to-beige" },
  { label: "Hochzeit", gradient: "from-beige via-green-light/40 to-paper-soft" },
  { label: "Produkt", gradient: "from-white via-paper-soft to-beige" },
  { label: "Event", gradient: "from-beige-dark/70 via-beige to-white" },
  { label: "Editorial", gradient: "from-beige via-white to-green-light/30" },
  { label: "Familie", gradient: "from-paper-soft via-beige to-beige-dark/60" },
  { label: "Architektur", gradient: "from-beige-dark via-paper-soft to-beige" },
  { label: "Studio", gradient: "from-white via-beige to-green-light/20" },
];

export default function GaleriePage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Ein Blick in unsere Arbeit."
        description="Diese Seite zeigt die Platzhalter-Struktur unserer Galerie. Sobald echte Projektbilder vorliegen, ersetzen wir die Flächen unten 1:1 durch Fotos."
      >
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          Unsere Galerie gliedert sich in die Bereiche Portrait, Business, Hochzeit, Produkt,
          Event, Editorial, Familie, Architektur und Studio – passend zu den Leistungen, die wir
          in {business.address.city} und ganz Nordrhein-Westfalen anbieten. Du möchtest konkrete
          Referenzbilder zu deinem Anlass sehen? Schreib uns kurz über das{" "}
          <a href="/kontakt" className="text-green hover:underline">
            Kontaktformular
          </a>{" "}
          – wir schicken passende Beispiele aus unserem aktuellen Portfolio.
        </p>
      </PageHero>

      <section className="bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.label}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-beige-dark/20 bg-gradient-to-br ${cat.gradient} ${
                  i % 5 === 0 ? "aspect-[3/4] sm:row-span-2" : "aspect-square"
                }`}
              >
                <div className="bg-grain absolute inset-0 opacity-70" />
                <div className="absolute inset-0 flex items-end p-5">
                  <span className="rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white backdrop-blur-sm">
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
