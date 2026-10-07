"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal, ScrollStagger, staggerItem } from "@/components/motion/ScrollReveal";
import { serviceAreas } from "@/lib/content/business";
import { motion } from "framer-motion";

export function LocalSeoTeaser() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <ScrollReveal className="text-center">
          <Eyebrow>Einzugsgebiet</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
            Fotograf in deiner Stadt – überall in Nordrhein-Westfalen.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft/80">
            Unser Studio liegt in Düsseldorf, gebucht werden wir in ganz NRW. Wähle deine Stadt
            für lokale Infos zu An- und Abfahrt, Locations und Ansprechpartnern.
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {serviceAreas.map((area) => (
            <motion.div key={area.slug} variants={staggerItem}>
              <Link
                href={`/standorte/${area.slug}`}
                className="group flex items-center justify-between gap-2 rounded-2xl border border-beige-dark/30 bg-paper-soft px-4 py-3 text-sm text-ink-soft transition-colors hover:border-green hover:text-green"
              >
                {area.city}
                <MapPin className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </ScrollStagger>
      </Container>
    </section>
  );
}
