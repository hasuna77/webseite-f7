"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 9, suffix: "+", label: "Jahre Erfahrung" },
  { value: 1200, suffix: "+", label: "Shootings begleitet" },
  { value: 10, suffix: "", label: "Städte in NRW betreut" },
  { value: 24, suffix: "h", label: "Antwortzeit (Ø)" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl text-ink sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-beige-dark/30 bg-paper-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4 lg:px-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-ink-soft/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
