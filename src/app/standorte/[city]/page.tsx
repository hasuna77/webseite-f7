import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Car, MapPin } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";
import { business, serviceAreas, services } from "@/lib/content/business";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

type Params = { city: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) return {};

  return {
    title: `Fotograf ${area.city} – ${business.name}`,
    description: `Fotograf für ${area.city}: Portrait-, Business- & Hochzeitsfotografie von ${business.name}. ${
      area.distanceFromStudio ? `Nur ${area.distanceFromStudio} entfernt.` : "Direkt vor Ort."
    }`,
    alternates: { canonical: `/standorte/${area.slug}` },
    keywords: [`Fotograf ${area.city}`, `Fotostudio ${area.city}`, `Fotografie ${area.city}`],
    openGraph: {
      title: `Fotograf ${area.city} – ${business.name}`,
      description: area.intro,
      url: `${business.domain}/standorte/${area.slug}`,
    },
  };
}

export default async function StandortDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  const localFaq = [
    {
      question: `Hat ${business.name} ein Studio in ${area.city}?`,
      answer:
        area.city === business.address.city
          ? `Ja, unser Hauptstudio befindet sich direkt in ${business.address.city}, ${business.address.street}.`
          : `Unser festes Studio liegt in ${business.address.city}${
              area.distanceFromStudio ? ` (${area.distanceFromStudio} von ${area.city} entfernt)` : ""
            }. Für Shootings in ${area.city} kommen wir mit mobilem Equipment zu dir oder an eine passende Location vor Ort.`,
    },
    {
      question: `Was kostet ein Fotoshooting in ${area.city}?`,
      answer: `Die Preise entsprechen unseren regulären Leistungen ab ${Math.min(
        ...services.map((s) => s.priceFrom)
      )}€. Bei Shootings außerhalb von ${business.address.city} kann eine Anfahrtspauschale hinzukommen, die wir vorab transparent kommunizieren.`,
    },
    {
      question: `Welche Art von Fotografie bietet ihr in ${area.city} an?`,
      answer: `Von Portrait- über Business- bis Hochzeitsfotografie – alle unsere Leistungen sind auch in ${area.city} buchbar. Sprich uns einfach auf dein Vorhaben an.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: business.domain },
              { name: "Standorte", url: `${business.domain}/standorte` },
              { name: area.city, url: `${business.domain}/standorte/${area.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(localFaq)) }}
      />

      <section className="bg-ink pb-20 pt-36 text-white lg:pt-44">
        <Container className="max-w-3xl">
          <Eyebrow>Standort</Eyebrow>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl">
            Fotograf in {area.city}
          </h1>
          <p className="mt-6 text-lg text-white/70">{area.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <LinkButton href="/kontakt">Shooting in {area.city} anfragen</LinkButton>
            {area.distanceFromStudio && (
              <span className="flex items-center gap-2 text-sm text-white/60">
                <Car className="h-4 w-4" /> {area.distanceFromStudio} ab {business.address.city}
              </span>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="font-display text-2xl text-ink">
              Warum Kund:innen aus {area.city} uns buchen
            </h2>
            <ul className="mt-6 space-y-4 text-ink-soft/80">
              <li>· Persönliche Beratung statt Formular-Abwicklung</li>
              <li>· Flexible Termine, auch früh morgens oder am Wochenende</li>
              <li>· Mobiles Studio-Equipment für Shootings bei dir vor Ort</li>
              <li>· Transparente Preise ohne versteckte Kosten</li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl text-ink">Unsere Leistungen</h2>
            <div className="mt-6 grid gap-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/leistungen/${service.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-beige-dark/30 bg-paper-soft px-5 py-3.5 text-sm text-ink-soft transition-colors hover:border-green/40 hover:text-green"
                >
                  {service.title}
                  <ArrowUpRight className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-paper-soft py-20 lg:py-24">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-ink">Häufige Fragen zu {area.city}</h2>
          <div className="mt-8 space-y-6">
            {localFaq.map((item) => (
              <div key={item.question}>
                <h3 className="font-display text-lg text-ink">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <h2 className="font-display text-xl text-ink">Weitere Standorte in NRW</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {serviceAreas
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/standorte/${a.slug}`}
                  className="flex items-center gap-1.5 rounded-full border border-beige-dark/30 px-4 py-2 text-sm text-ink-soft hover:border-green hover:text-green"
                >
                  <MapPin className="h-3.5 w-3.5" /> {a.city}
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
