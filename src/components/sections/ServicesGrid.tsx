"use client";

import Link from "next/link";
import { ArrowUpRight, Aperture, Briefcase, Heart, Package, PartyPopper } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal, ScrollStagger, staggerItem } from "@/components/motion/ScrollReveal";
import { services } from "@/lib/content/business";
import { motion } from "framer-motion";

const ICONS: Record<string, typeof Aperture> = {
  portraitfotografie: Aperture,
  businessfotografie: Briefcase,
  hochzeitsfotografie: Heart,
  produktfotografie: Package,
  eventfotografie: PartyPopper,
};

export function ServicesGrid() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <Eyebrow>Leistungen</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-4xl text-ink sm:text-5xl">
            Für jeden Anlass die passende Perspektive.
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.slug] ?? Aperture;
            return (
              <motion.div key={service.slug} variants={staggerItem}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-beige-dark/30 bg-paper-soft p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-soft"
                >
                  <div>
                    <Icon className="h-7 w-7 text-green" strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-xl text-ink">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
                      {service.summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-ink-soft/70">ab {service.priceFrom}€</span>
                    <span className="flex items-center gap-1 font-medium text-green transition-transform group-hover:translate-x-1">
                      Mehr erfahren <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </ScrollStagger>
      </Container>
    </section>
  );
}
