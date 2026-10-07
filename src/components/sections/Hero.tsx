"use client";

import { motion } from "framer-motion";
import { ArrowDown, Camera } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { business } from "@/lib/content/business";

export function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-center overflow-hidden bg-ink text-white">
      <div className="bg-grain absolute inset-0">
        <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-green/25 blur-[140px]" />
        <div className="absolute -right-32 bottom-[-20%] h-[30rem] w-[30rem] rounded-full bg-beige/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 pt-32 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-green-light"
          >
            <Camera className="h-4 w-4" strokeWidth={1.5} />
            Fotostudio · {business.address.city} & ganz NRW
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl"
          >
            Bilder, die bleiben.
            <span className="block italic text-beige">Fotografie mit Haltung.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
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
            <LinkButton href="/galerie" variant="ghost" className="border-white/30 text-white hover:border-green-light hover:text-green-light">
              Galerie ansehen
            </LinkButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-beige/30 via-green/20 to-ink" />
          <div className="absolute inset-0 bg-grain opacity-60" />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-ink/60 p-6 backdrop-blur-sm">
            <p className="font-display text-xl italic text-beige">
              „Licht ist die Sprache, in der wir erzählen.“
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
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
