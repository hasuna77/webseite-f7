import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Über uns",
  description: `Lerne ${business.name} kennen: inhabergeführtes Fotostudio in ${business.address.city}, seit ${business.founded} für Kund:innen in ganz NRW.`,
  alternates: { canonical: "/ueber-uns" },
};

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Menschen hinter der Kamera."
        description={business.description}
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-beige-dark/30 bg-gradient-to-br from-beige via-paper-soft to-white">
              <div className="bg-grain relative h-full w-full opacity-50" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Eyebrow>Unsere Geschichte</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
              Seit {business.founded} in {business.address.city} zuhause.
            </h2>
            <p className="mt-5 text-ink-soft/80 leading-relaxed">
              {business.name} wurde aus der Überzeugung gegründet, dass gute Fotografie nicht
              laut sein muss, um zu wirken. Aus einem kleinen Studio ist ein Team geworden, das
              heute Kund:innen in ganz Nordrhein-Westfalen begleitet – von der ersten Anfrage bis
              zur fertigen Galerie.
            </p>
            <p className="mt-4 text-ink-soft/80 leading-relaxed">
              Unser Anspruch bleibt gleich: ehrliches Licht, echte Momente, verlässliche
              Zusammenarbeit.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-beige py-20 lg:py-28">
        <Container>
          <ScrollReveal className="text-center">
            <Eyebrow>Werte</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl text-ink sm:text-5xl">
              Worauf wir Wert legen.
            </h2>
          </ScrollReveal>

          <ValuesGrid />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
