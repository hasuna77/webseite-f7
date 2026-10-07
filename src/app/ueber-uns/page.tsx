import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      <section className="bg-ink pb-20 pt-36 text-white lg:pt-44">
        <Container className="max-w-3xl">
          <Eyebrow>Über uns</Eyebrow>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl">
            Menschen hinter der Kamera.
          </h1>
          <p className="mt-6 text-lg text-white/70">{business.description}</p>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-beige via-green-light/40 to-ink">
              <div className="bg-grain h-full w-full opacity-60" />
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
