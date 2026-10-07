import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <section className="bg-paper pb-24 pt-36 lg:pt-44">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl text-ink">Datenschutzerklärung</h1>

        <div className="prose-custom mt-10 space-y-8 text-sm leading-relaxed text-ink-soft/85">
          <div>
            <h2 className="font-display text-xl text-ink">1. Verantwortlicher</h2>
            <p className="mt-2">
              {business.legalName}, {business.address.street}, {business.address.zip}{" "}
              {business.address.city}, E-Mail: {business.email}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">2. Hosting & Server-Logfiles</h2>
            <p className="mt-2">
              Beim Aufruf dieser Website verarbeitet unser Hosting-Anbieter [Hosting-Anbieter
              einfügen] automatisch Informationen in Server-Logfiles (IP-Adresse, Datum/Uhrzeit,
              aufgerufene Seite, Browsertyp). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse am sicheren und stabilen Betrieb der Website).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">3. Konto-Registrierung & Login</h2>
            <p className="mt-2">
              Wenn du ein Konto erstellst, speichern wir Name, E-Mail-Adresse und ein sicheres
              Passwort-Hash (bcrypt) in unserer Datenbank. Die Anmeldung erfolgt über ein
              verschlüsseltes, signiertes Sitzungs-Cookie (technisch notwendig). Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung/-erfüllung).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">4. Kontaktformular</h2>
            <p className="mt-2">
              Angaben aus dem Kontaktformular (Name, E-Mail, optional Telefon, Nachricht)
              speichern wir zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit.
              b bzw. f DSGVO.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">5. KI-Chat-Assistent</h2>
            <p className="mt-2">
              Unser Chat-Widget kann, sofern aktiviert, Anfragen zur Beantwortung an die Anthropic
              PBC (USA) übermitteln (Claude API). Dabei werden deine Chat-Eingaben verarbeitet, um
              eine Antwort zu generieren. Es werden keine dauerhaften Profile gespeichert; die
              Übermittlung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an effizientem Kundenservice). Bei einer Datenübermittlung in die USA
              stützen wir uns auf die Standardvertragsklauseln der EU-Kommission. Bitte gib im
              Chat keine besonders sensiblen Daten an.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">6. Cookies</h2>
            <p className="mt-2">
              Wir verwenden ausschließlich technisch notwendige Cookies (z. B. das
              Sitzungs-Cookie für den Login). Diese erfordern keine Einwilligung nach § 25 Abs. 2
              TTDSG. Marketing- oder Tracking-Cookies setzen wir aktuell nicht ein.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">7. Deine Rechte</h2>
            <p className="mt-2">
              Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
              Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Wende dich
              dazu an {business.email}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">8. Beschwerderecht</h2>
            <p className="mt-2">
              Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, z. B.
              bei der zuständigen Aufsichtsbehörde für Nordrhein-Westfalen (LDI NRW).
            </p>
          </div>

          <p className="text-xs text-ink-soft/50">
            Hinweis: Diese Datenschutzerklärung beschreibt die aktuell implementierte
            Datenverarbeitung. Bitte vor Veröffentlichung durch eine rechtssichere, individuell
            geprüfte Fassung ergänzen (Hosting-Anbieter eintragen, ggf. Rechtsberatung
            einholen) und bei neuen Diensten (z. B. Analytics, Newsletter) aktualisieren.
          </p>
        </div>
      </Container>
    </section>
  );
}
