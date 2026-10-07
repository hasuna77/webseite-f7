import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { business, services } from "@/lib/content/business";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.summary} ${business.name} in ${business.address.city} – ab ${service.priceFrom}€. Jetzt Termin anfragen.`,
    alternates: { canonical: `/leistungen/${service.slug}` },
    keywords: service.keywords,
    openGraph: {
      title: `${service.title} – ${business.name}`,
      description: service.summary,
      url: `${business.domain}/leistungen/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: business.domain },
              { name: "Leistungen", url: `${business.domain}/leistungen` },
              { name: service.title, url: `${business.domain}/leistungen/${service.slug}` },
            ])
          ),
        }}
      />

      <PageHero eyebrow={service.shortTitle} title={service.title} description={service.description}>
        <div className="flex flex-wrap items-center gap-6">
          <LinkButton href="/kontakt">Termin anfragen</LinkButton>
          <span className="text-sm text-ink-soft">
            ab <strong className="text-ink">{service.priceFrom}€</strong> · ca.{" "}
            {service.durationMinutes >= 60
              ? `${Math.round(service.durationMinutes / 60)} Std.`
              : `${service.durationMinutes} Min.`}
          </span>
        </div>
      </PageHero>

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1px_1fr]">
          <ScrollReveal>
            <h2 className="font-display text-2xl text-ink">Das ist inklusive</h2>
            <ul className="mt-6 space-y-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-ink-soft">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green" />
                  {feature}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <div className="hidden bg-beige-dark/30 lg:block" />

          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl text-ink">Gut zu wissen</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-ink-soft/60">Preis</dt>
                <dd className="mt-1 text-ink">ab {service.priceFrom}€</dd>
              </div>
              <div>
                <dt className="text-ink-soft/60">Dauer</dt>
                <dd className="mt-1 text-ink">
                  ca.{" "}
                  {service.durationMinutes >= 60
                    ? `${Math.round(service.durationMinutes / 60)} Stunden`
                    : `${service.durationMinutes} Minuten`}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft/60">Einzugsgebiet</dt>
                <dd className="mt-1 text-ink">{business.address.city} & ganz NRW</dd>
              </div>
            </dl>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-paper-soft py-20 lg:py-24">
        <Container>
          <h2 className="font-display text-2xl text-ink">Weitere Leistungen</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/leistungen/${item.slug}`}
                className="rounded-2xl border border-beige-dark/30 bg-paper p-6 transition-colors hover:border-green/40"
              >
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft/70">ab {item.priceFrom}€</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
