import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { business, serviceAreas } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Fotograf in NRW – unsere Standorte",
  description: `${business.name} fotografiert in ganz Nordrhein-Westfalen: ${serviceAreas
    .map((a) => a.city)
    .join(", ")}.`,
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  return (
    <>
      <section className="bg-ink pb-20 pt-36 text-white lg:pt-44">
        <Container>
          <Eyebrow>Standorte</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-5xl sm:text-6xl">
            Fotograf in ganz Nordrhein-Westfalen.
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            Unser Studio liegt in {business.address.city} – gebucht werden wir landesweit. Wähle
            deine Stadt für lokale Infos.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/standorte/${area.slug}`}
              className="group rounded-2xl border border-beige-dark/30 bg-paper-soft p-7 transition-all hover:border-green/40 hover:shadow-soft"
            >
              <MapPin className="h-6 w-6 text-green" strokeWidth={1.5} />
              <h2 className="mt-4 font-display text-xl text-ink">
                Fotograf {area.city}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{area.intro}</p>
            </Link>
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
