"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ScrollReveal, ScrollStagger, staggerItem } from "@/components/motion/ScrollReveal";
import { motion } from "framer-motion";

const TILES = [
  { label: "Portrait", gradient: "from-beige-dark via-beige to-paper-soft", tall: true },
  { label: "Business", gradient: "from-paper-soft via-white to-beige", tall: false },
  { label: "Hochzeit", gradient: "from-beige via-green-light/40 to-paper-soft", tall: false },
  { label: "Produkt", gradient: "from-white via-paper-soft to-beige", tall: true },
  { label: "Event", gradient: "from-beige-dark/70 via-beige to-white", tall: false },
  { label: "Editorial", gradient: "from-beige via-white to-green-light/30", tall: false },
];

export function GalleryPreview() {
  return (
    <section className="bg-paper-soft py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ScrollReveal>
            <Eyebrow>Galerie</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-4xl text-ink sm:text-5xl">
              Ein Blick in unsere Arbeit.
            </h2>
          </ScrollReveal>
          <Link
            href="/galerie"
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-green"
          >
            Ganze Galerie <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ScrollStagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {TILES.map((tile) => (
            <motion.div
              key={tile.label}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-beige-dark/20 bg-gradient-to-br ${tile.gradient} ${
                tile.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <div className="bg-grain absolute inset-0 opacity-70" />
              <div className="absolute inset-0 flex items-end p-5">
                <span className="rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {tile.label}
                </span>
              </div>
            </motion.div>
          ))}
        </ScrollStagger>
      </Container>
    </section>
  );
}
