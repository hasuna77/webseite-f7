"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Bild/Fläche, die sich progressiv beim Scrollen öffnet: Während die
 * Section (hohe Scroll-Strecke) durchlaufen wird, bleibt die Ansicht fixiert
 * ("sticky") und die Fläche skaliert von klein/stark abgerundet zu
 * vollflächig/kantenlos auf.
 */
export function ScrollImageReveal({
  eyebrow,
  title,
  className = "",
  children,
  imageSrc,
  imageAlt,
}: {
  eyebrow?: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [0.55, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.85], [56, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -24]);

  return (
    <section ref={wrapperRef} className={`relative h-[220vh] bg-paper ${className}`}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className={`relative h-[72vh] w-full max-w-6xl overflow-hidden border border-beige-dark/30 shadow-soft ${
            imageSrc ? "bg-ink" : "bg-gradient-to-br from-beige via-paper-soft to-white"
          }`}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              sizes="(min-width: 1536px) 1152px, 90vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="bg-grain absolute inset-0 opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent" />
          {children}
        </motion.div>

        {title && (
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            {eyebrow && (
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-green">
                {eyebrow}
              </span>
            )}
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-ink sm:text-6xl">{title}</h2>
          </motion.div>
        )}
      </div>
    </section>
  );
}
