"use client";

import { Quote } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal, ScrollStagger, staggerItem } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";

/**
 * Platzhalter-Stimmen. Vor Veröffentlichung durch echte, mit Einverständnis
 * eingeholte Kundenzitate ersetzen – das stärkt Vertrauen & SEO deutlich mehr
 * als generische Beispieltexte.
 */
const QUOTES = [
  {
    quote:
      "Platzhalter-Zitat: Entspannte Atmosphäre, tolle Bilder – das Shooting hat sich wie ein guter Nachmittag angefühlt, nicht wie Arbeit.",
    name: "K. M.",
    context: "Portraitshooting, Düsseldorf",
  },
  {
    quote:
      "Platzhalter-Zitat: Unser gesamtes Team hat in unter zwei Stunden einheitliche Business-Fotos bekommen. Reibungslos organisiert.",
    name: "T. R.",
    context: "Teamfotos, Düsseldorf",
  },
  {
    quote:
      "Platzhalter-Zitat: Die Hochzeitsfotos zeigen genau die Emotionen, die wir in Erinnerung behalten wollten – ganz ohne gestellte Posen.",
    name: "S. & J.",
    context: "Hochzeit, Düsseldorf",
  },
];

export function Testimonials() {
  return (
    <section className="bg-beige py-24 lg:py-32">
      <Container>
        <ScrollReveal className="text-center">
          <Eyebrow>Stimmen</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl text-ink sm:text-5xl">
            Was Kund:innen sagen.
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((item) => (
            <motion.figure
              key={item.name}
              variants={staggerItem}
              className="flex h-full flex-col justify-between rounded-3xl bg-paper p-8 shadow-soft"
            >
              <Quote className="h-6 w-6 text-green" strokeWidth={1.5} />
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink-soft">
                „{item.quote}“
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.1em] text-ink-soft/60">
                {item.name} — {item.context}
              </figcaption>
            </motion.figure>
          ))}
        </ScrollStagger>
      </Container>
    </section>
  );
}
