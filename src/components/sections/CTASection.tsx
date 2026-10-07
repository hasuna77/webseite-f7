"use client";

import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { business } from "@/lib/content/business";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-green-dark py-24 text-white lg:py-28">
      <div className="bg-grain absolute inset-0 opacity-40" />
      <Container className="relative text-center">
        <ScrollReveal>
          <h2 className="mx-auto max-w-2xl font-display text-4xl sm:text-5xl">
            Lass uns dein nächstes Shooting planen.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-white/80">
            Schreib uns kurz, worum es geht – wir melden uns in der Regel innerhalb von 24
            Stunden mit freien Terminen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/kontakt" variant="secondary" className="bg-white text-green-dark hover:bg-beige">
              Termin anfragen
            </LinkButton>
            <a
              href={`tel:${business.phone}`}
              className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              oder anrufen: {business.phoneDisplay}
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
