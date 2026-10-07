"use client";

import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { business } from "@/lib/content/business";

export function CTASection() {
  return (
    <section className="bg-paper px-4 py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-beige-dark/30 bg-beige px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green/15 blur-[100px]"
          />
          <ScrollReveal className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl text-ink sm:text-5xl">
              Lass uns dein nächstes Shooting planen.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-ink-soft">
              Schreib uns kurz, worum es geht – wir melden uns in der Regel innerhalb von 24
              Stunden mit freien Terminen.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <LinkButton href="/kontakt">Termin anfragen</LinkButton>
              <a
                href={`tel:${business.phone}`}
                className="text-sm font-medium text-ink-soft underline-offset-4 hover:text-green hover:underline"
              >
                oder anrufen: {business.phoneDisplay}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
