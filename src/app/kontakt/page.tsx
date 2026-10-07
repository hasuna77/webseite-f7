import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { business } from "@/lib/content/business";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktiere ${business.name} in ${business.address.city} für dein Fotoshooting – Portrait, Business, Hochzeit oder Produkt. Antwort meist innerhalb von 24 Stunden.`,
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: business.domain },
              { name: "Kontakt", url: `${business.domain}/kontakt` },
            ])
          ),
        }}
      />

      <section className="bg-ink pb-20 pt-36 text-white lg:pt-44">
        <Container>
          <Eyebrow>Kontakt</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-5xl sm:text-6xl">
            Lass uns reden.
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            Erzähl uns kurz von deinem Vorhaben – wir melden uns in der Regel innerhalb von 24
            Stunden mit nächsten Schritten und freien Terminen. Egal ob Portrait, Business-Shooting,
            Hochzeit, Produktfotografie oder Event: Je mehr wir über Anlass, Wunschtermin und Ort
            wissen, desto schneller können wir dir ein passendes Angebot machen. Du erreichst uns
            auch außerhalb der Öffnungszeiten per E-Mail – wir melden uns am nächsten Werktag.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-green" />
              <div>
                <p className="font-display text-lg text-ink">Studio</p>
                <p className="text-sm text-ink-soft/80">
                  {business.address.street}
                  <br />
                  {business.address.zip} {business.address.city}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-green" />
              <div>
                <p className="font-display text-lg text-ink">Telefon</p>
                <a href={`tel:${business.phone}`} className="text-sm text-ink-soft/80 hover:text-green">
                  {business.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-green" />
              <div>
                <p className="font-display text-lg text-ink">E-Mail</p>
                <a href={`mailto:${business.email}`} className="text-sm text-ink-soft/80 hover:text-green">
                  {business.email}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-beige-dark/30 bg-paper-soft p-6">
              <p className="font-display text-sm uppercase tracking-[0.1em] text-ink-soft/60">
                Öffnungszeiten
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                {business.openingHours.map((entry) => (
                  <div key={entry.days} className="flex justify-between gap-4">
                    <dt className="text-ink-soft/70">{entry.days}</dt>
                    <dd className="text-ink">{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="rounded-3xl border border-beige-dark/30 bg-paper-soft p-8 lg:p-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
