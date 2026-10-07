"use client";

import { Leaf, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollStagger, staggerItem } from "@/components/motion/ScrollReveal";

const VALUES = [
  {
    icon: Sparkles,
    title: "Zeitloser Stil",
    text: "Keine kurzlebigen Trends – unsere Bilder sollen auch in zehn Jahren noch gefallen.",
  },
  {
    icon: Users,
    title: "Persönlich statt anonym",
    text: "Kein Fließband-Shooting: Wir nehmen uns Zeit für dich und dein Anliegen.",
  },
  {
    icon: Leaf,
    title: "Ehrlich & nachhaltig",
    text: "Transparente Preise, bewusster Ressourceneinsatz, lokale Partner wo immer möglich.",
  },
];

export function ValuesGrid() {
  return (
    <ScrollStagger className="mt-14 grid gap-6 md:grid-cols-3">
      {VALUES.map((value) => (
        <motion.div key={value.title} variants={staggerItem} className="rounded-3xl bg-paper p-8 shadow-soft">
          <value.icon className="h-7 w-7 text-green" strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-xl text-ink">{value.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">{value.text}</p>
        </motion.div>
      ))}
    </ScrollStagger>
  );
}
