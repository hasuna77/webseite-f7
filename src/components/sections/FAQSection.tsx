"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FAQ_ITEMS } from "@/lib/content/faq";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container className="max-w-4xl">
        <ScrollReveal className="text-center">
          <Eyebrow>Häufige Fragen</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl text-ink sm:text-5xl">
            Gut zu wissen.
          </h2>
        </ScrollReveal>

        <div className="mt-12 divide-y divide-beige-dark/30 border-y border-beige-dark/30">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-ink">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-green transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-ink-soft/80">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
