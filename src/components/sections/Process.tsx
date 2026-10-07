"use client";

import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const STEPS = [
  {
    number: "01",
    title: "Kennenlernen",
    text: "Kurzes Gespräch per Telefon oder Mail – wir klären Ziel, Stil und Rahmen deines Shootings.",
  },
  {
    number: "02",
    title: "Vorbereitung",
    text: "Terminbestätigung, Location- und Styling-Tipps, damit du am Tag entspannt bist.",
  },
  {
    number: "03",
    title: "Das Shooting",
    text: "Im Studio oder vor Ort – mit professionellem Licht und viel Ruhe für gute Bilder.",
  },
  {
    number: "04",
    title: "Auswahl & Lieferung",
    text: "Online-Galerie zur Auswahl, Retusche und finale Lieferung in Web- und Druckqualität.",
  },
];

export function Process() {
  return (
    <section className="bg-ink py-24 text-white lg:py-32">
      <Container>
        <ScrollReveal>
          <Eyebrow>Ablauf</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-4xl sm:text-5xl">
            So entsteht dein Shooting.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <span className="font-display text-sm text-green-light">{step.number}</span>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
