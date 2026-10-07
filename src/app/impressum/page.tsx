import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="bg-paper pb-24 pt-36 lg:pt-44">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl text-ink">Impressum</h1>

        <div className="prose-custom mt-10 space-y-8 text-sm leading-relaxed text-ink-soft/85">
          <div>
            <h2 className="font-display text-xl text-ink">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              {business.legalName}
              <br />
              {business.address.street}
              <br />
              {business.address.zip} {business.address.city}
              <br />
              {business.address.countryName}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Kontakt</h2>
            <p className="mt-2">
              Telefon: {business.phoneDisplay}
              <br />
              E-Mail: {business.email}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Vertreten durch</h2>
            <p className="mt-2">
              [Name der Geschäftsführung einfügen] — bitte vor Veröffentlichung ergänzen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Registereintrag</h2>
            <p className="mt-2">
              Eintragung im Handelsregister. <br />
              Registergericht: [einfügen] <br />
              Registernummer: [einfügen]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Umsatzsteuer-ID</h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [USt-IdNr.
              einfügen]
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-2">
              [Name, Anschrift wie oben] — bitte vor Veröffentlichung ergänzen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">EU-Streitschlichtung</h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben
              im Impressum. Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Haftung für Inhalte</h2>
            <p className="mt-2">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>

          <p className="text-xs text-ink-soft/50">
            Hinweis: Dies ist eine Vorlage. Bitte durch eine rechtssichere, individuell geprüfte
            Fassung (z. B. mit anwaltlicher Beratung oder einem Impressum-Generator) ersetzen,
            bevor die Seite live geht.
          </p>
        </div>
      </Container>
    </section>
  );
}
