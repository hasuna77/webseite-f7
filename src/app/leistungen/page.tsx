import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Aperture,
  Briefcase,
  Clapperboard,
  Heart,
  Package,
  PartyPopper,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { business, services } from "@/lib/content/business";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

const ICONS = {
  portraitfotografie: Aperture,
  businessfotografie: Briefcase,
  hochzeitsfotografie: Heart,
  produktfotografie: Package,
  eventfotografie: PartyPopper,
  videografie: Clapperboard,
} as const;

export const metadata: Metadata = {
  title: "Leistungen",
  description: `Portrait-, Business-, Hochzeits-, Produkt-, Event- und Videoproduktion (Reels & Social Content) von ${business.name} in ${business.address.city} und ganz NRW. Transparente Preise, flexible Termine.`,
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: business.domain },
              { name: "Leistungen", url: `${business.domain}/leistungen` },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Leistungen"
        title="Fotografie für jeden Anlass."
        description="Ob Portrait, Unternehmen, Hochzeit, Produkt oder Social-Media-Reel – jedes Shooting bekommt bei uns ein klares Konzept, professionelles Licht und eine ehrliche Preisstruktur."
      />

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-6">
          {services.map((service) => {
            const Icon = ICONS[service.slug as keyof typeof ICONS] ?? Aperture;
            return (
              <Link
                key={service.slug}
                href={`/leistungen/${service.slug}`}
                className="group grid gap-6 rounded-3xl border border-beige-dark/30 bg-paper-soft p-8 transition-all duration-300 hover:border-green/40 hover:shadow-soft md:grid-cols-[auto_1fr_auto] md:items-center md:p-10"
              >
                <Icon className="h-10 w-10 text-green" strokeWidth={1.3} />
                <div>
                  <h2 className="font-display text-2xl text-ink">{service.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft/80">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
                  <span className="text-sm text-ink-soft/70">ab {service.priceFrom}€</span>
                  <span className="flex items-center gap-1 font-medium text-green transition-transform group-hover:translate-x-1">
                    Details <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
