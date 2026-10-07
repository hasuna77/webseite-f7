import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-paper-soft pb-20 pt-40 lg:pb-24 lg:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green/10 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-beige-dark/20 blur-[100px]"
      />
      <Container className="relative max-w-3xl">
        <div className="animate-fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          className="animate-fade-up mt-5 font-display text-5xl leading-[1.05] text-ink sm:text-6xl"
          style={{ animationDelay: "0.08s" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "0.16s" }}
          >
            {description}
          </p>
        )}
        {children && (
          <div className="animate-fade-up mt-8" style={{ animationDelay: "0.24s" }}>
            {children}
          </div>
        )}
      </Container>
      <div className="absolute inset-x-0 bottom-0 h-10 rounded-t-[2.5rem] bg-paper lg:h-14" />
    </section>
  );
}
