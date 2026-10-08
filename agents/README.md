# Automatisierungs-Agents

Eigenständige, per Kommandozeile ausführbare Node/TypeScript-Skripte –
unabhängig von der laufenden Website. Die ersten drei teilen sich die
Geschäftsdaten dieser Website (`src/lib/content/business.ts`), der
`innoviadruck-content-agent` ist für eine **andere** Firma (eine Druckerei,
nicht Teil dieses Website-Repos) und bringt seine eigenen Geschäftsdaten mit.
Alle laufen lokal, per Cronjob oder in einer CI-Pipeline (z. B. GitHub
Actions) und sind standardmäßig **Dry-Run**: Es wird nie unbemerkt etwas
veröffentlicht.

| Agent | Zweck | Befehl |
|---|---|---|
| `content-agent` | Schreibt neue SEO-Blogartikel-Entwürfe fürs Journal (F7 Studio) | `npm run agent:content -- --count 2` |
| `posting-agent` | Erstellt Social-Media-Captions (IG/FB/LinkedIn) und postet sie optional live | `npm run agent:posting -- --slug <slug> --live` |
| `seo-agent` | Crawlt die Sitemap, prüft On-Page-SEO, erstellt priorisierten Maßnahmenplan | `npm run agent:seo -- --url https://deine-domain.de` |
| `innoviadruck-content-agent` | Schreibt SEO-Blogartikel-Entwürfe für die Druckerei innoviadruck.de | `npm run agent:innoviadruck-content -- --count 2` |

## Einrichtung

1. `.env` im Projekt-Root anlegen (siehe `.env.example`).
2. Mindestens `ANTHROPIC_API_KEY` setzen – ohne diesen Key können die Agents
   keine Texte generieren.
3. Für echtes Posten zusätzlich die Social-Media-Zugangsdaten setzen (siehe
   unten). Ohne diese Zugangsdaten überspringt der `posting-agent` die
   jeweilige Plattform automatisch und erklärt, was fehlt.

## 1. Content-Agent

Generiert vollständige Artikel-Entwürfe im selben Format wie
`src/lib/content/posts.ts` (Titel, Meta-Description, Abschnitte).

```bash
npm run agent:content -- --count 2                 # 2 neue Themen vorschlagen & schreiben
npm run agent:content -- --topic "Herbstportraits"  # gezielt 1 Artikel zu einem Thema
npm run agent:content -- --count 1 --apply          # Entwurf direkt in posts.ts einfügen
```

Entwürfe landen immer zusätzlich als JSON unter `agents/content-agent/output/`.
**Bitte fachlich gegenlesen**, bevor `--apply`-generierte Artikel live gehen –
die KI kennt eure realen Preise/Abläufe nicht im Detail, nur was in
`business.ts` hinterlegt ist.

## 2. Posting-Agent

Erstellt plattformgerechte Captions aus einem bestehenden Blogartikel
(`--slug`), einer Entwurfsdatei (`--source`) oder einem freien Thema
(`--topic`).

```bash
npm run agent:posting -- --slug fotostudio-duesseldorf-worauf-achten
npm run agent:posting -- --topic "Neue Öffnungszeiten im Dezember" --live --platforms facebook
```

- Ohne `--live`: nur Vorschau + gespeicherte Captions, es wird nichts gepostet.
- Mit `--live`: versucht tatsächlich zu posten. Pro Plattform nötig:
  - **Facebook** (Text-Posts funktionieren direkt): `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`
  - **Instagram** (benötigt zwingend ein Bild, Graph API erlaubt keine reinen Text-Posts): zusätzlich `INSTAGRAM_BUSINESS_ACCOUNT_ID` und `--image <öffentliche-Bild-URL>`
  - **LinkedIn** (Organization-Posting): `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORG_URN`

Fehlen Zugangsdaten für eine Plattform, wird sie übersprungen (mit Hinweis),
die anderen werden trotzdem bearbeitet.

### Zugangsdaten besorgen

- **Facebook/Instagram**: Meta for Developers → App anlegen → Facebook-Seite
  verbinden → Seiten-Zugriffstoken generieren (langlebig) → Instagram
  Business-Konto mit der Seite verknüpfen, dessen ID über die Graph API
  Explorer-Oberfläche auslesen.
- **LinkedIn**: LinkedIn Developer Portal → App anlegen → Unternehmensseite
  verknüpfen → OAuth2-Token mit `w_organization_social`-Scope erzeugen.

## 3. SEO-Agent

Crawlt `/sitemap.xml` der angegebenen URL, prüft jede Seite (Title-Länge,
Meta-Description, Canonical, H1, strukturierte Daten, Antwortzeit,
Textmenge) und lässt Claude daraus einen priorisierten Maßnahmenplan
schreiben – mit Fokus auf die Ziel-Keywords "Fotostudio", "Fotograf",
"Fotografen Nordrhein-Westfalen".

```bash
npm run agent:seo -- --url http://localhost:3000        # lokal testen
npm run agent:seo -- --url https://deine-live-domain.de # produktiv
```

Report landet unter `agents/seo-agent/output/<datum>-report.md`.

## Automatisch laufen lassen

Beispiel für einen wöchentlichen Lauf per GitHub Actions
(`.github/workflows/seo-audit.yml`):

```yaml
on:
  schedule:
    - cron: "0 6 * * 1" # jeden Montag 06:00 UTC
jobs:
  seo-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run agent:seo -- --url https://deine-live-domain.de
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - uses: actions/upload-artifact@v4
        with:
          name: seo-report
          path: agents/seo-agent/output/*.md
```

Content- und Posting-Agent lassen sich analog als geplante Workflows oder
lokale Cronjobs einrichten – angepasst an eure Freigabe-Prozesse (z. B.
Content-Agent läuft wöchentlich, ein Mensch prüft die Entwürfe, danach
manuell `--apply` oder Posting-Agent mit `--live`).

## 4. innoviadruck-content-agent

**Achtung: eigenständiges Werkzeug für eine andere Firma.** innoviadruck.de
ist keine Website aus diesem Repo (dieses Repo ist F7 Studio) – der Agent
nutzt deshalb seine eigenen Geschäftsdaten in
`agents/innoviadruck-content-agent/business.ts`, nicht `src/lib/content/business.ts`.

Beim Erstellen war `innoviadruck.de` nicht erreichbar (kein DNS-Eintrag),
daher enthält `business.ts` aktuell nur **Platzhalter** für eine typische
Online-Druckerei (Adresse, genaues Leistungsangebot, Preise). **Bitte diese
Datei zuerst mit den echten Daten befüllen** (TODO-Kommentare darin) –
sonst generiert Claude Ratgebertexte mit falschen Fakten.

```bash
npm run agent:innoviadruck-content -- --count 2                       # 2 neue Themen vorschlagen & schreiben
npm run agent:innoviadruck-content -- --topic "Welches Papier für Flyer?"  # gezielt 1 Artikel
```

Entwürfe landen als JSON unter `agents/innoviadruck-content-agent/output/`
(Format: Titel, Meta-Description, Abschnitte – wie beim `content-agent`).
Es gibt **kein `--apply`**, da dieses Repo keine Website für innoviadruck.de
enthält, in die automatisch eingefügt werden könnte – die Entwürfe müssen
manuell in die jeweilige Ziel-Website übernommen werden.
