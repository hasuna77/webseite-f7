"use client";

import { motion } from "framer-motion";
import { ArrowDown, Camera } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { business } from "@/lib/content/business";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper-soft pb-24 pt-40 lg:pb-28 lg:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-green/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-[-10%] h-[22rem] w-[22rem] rounded-full bg-beige-dark/25 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-green"
          >
            <Camera className="h-4 w-4" strokeWidth={1.5} />
            Fotostudio · {business.address.city} & ganz NRW
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] text-balance text-ink sm:text-6xl lg:text-[4.2rem]"
          >
            Bilder, die bleiben.
            <span className="block italic text-green-dark">Fotografie mit Haltung.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            {business.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="/kontakt">Termin anfragen</LinkButton>
            <LinkButton href="/galerie" variant="ghost">
              Galerie ansehen
            </LinkButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-beige-dark/30 bg-gradient-to-br from-beige via-paper-soft to-white shadow-soft"
        >
          <div className="bg-grain absolute inset-0 opacity-40" />
          <div className="absolute inset-x-6 bottom-6 rounded-[1.75rem] bg-paper/80 p-6 backdrop-blur-sm">
            <p className="font-display text-xl italic text-ink">
              „Licht ist die Sprache, in der wir erzählen.“
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative mt-16 flex flex-col items-center gap-2 text-ink-soft/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Entdecken</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
