# Lichtraum Fotostudio – Website

Elegante, SEO-optimierte Website für ein Fotostudio in NRW, gebaut mit
Next.js 16 (App Router), Tailwind CSS v4 und Framer Motion. Enthält ein
vollständiges Registrieren-/Anmelden-System, einen KI-Chat-Support und drei
eigenständige Automatisierungs-Agents für Content, Social-Media-Posting und
SEO-Audits.

## ⚠️ Vor dem Livegang unbedingt anpassen

Alle Geschäftsdaten (Name, Adresse, Telefon, Leistungen, Preise) sind
**Platzhalter** in `src/lib/content/business.ts`. Für echtes lokales SEO
("Fotostudio NRW", "Fotograf Düsseldorf" etc.) müssen Name, Adresse und
Telefonnummer exakt mit eurem Google-Unternehmensprofil übereinstimmen.

Außerdem:
- `src/app/impressum/page.tsx` – Platzhalter mit `[...]`-Markierungen ausfüllen.
- `src/app/datenschutz/page.tsx` – Hosting-Anbieter eintragen, ggf. rechtlich prüfen lassen.
- `src/components/sections/Testimonials.tsx` – echte Kundenstimmen (mit Einverständnis) einsetzen.
- Galerie-Platzhalterkacheln durch echte Projektfotos ersetzen.

## Tech-Stack

- **Next.js 16** (App Router, Server Actions, Server Components)
- **Tailwind CSS v4** (CSS-first Theme in `src/app/globals.css`)
- **Framer Motion** für Scroll-Animationen
- **node:sqlite** (Node 22 eingebaut) als leichtgewichtige Datenbank – kein externer DB-Server nötig
- **jose** (JWT-Sessions) + **bcryptjs** (Passwort-Hashing) für Auth
- **@anthropic-ai/sdk** für den KI-Chat-Support und die Automatisierungs-Agents

## Setup

```bash
npm install
cp .env.example .env
# ANTHROPIC_API_KEY setzen, damit der KI-Chat antwortet (sonst Fallback-Text)
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000). Die SQLite-Datenbank
wird automatisch unter `.data/app.db` angelegt (git-ignoriert).

## Funktionen

### Registrieren & Anmelden
Vollständig funktionsfähig: Registrierung, Login, Logout, geschützte
`/dashboard`-Route (serverseitig via `src/proxy.ts`), Profil bearbeiten,
Passwort ändern. Passwörter werden mit bcrypt gehasht, Sessions sind
signierte, httpOnly-Cookies (`jose`).

### Scroll-Animationen
`src/components/motion/ScrollReveal.tsx` kapselt Framer-Motion-Reveal- und
Stagger-Animationen, genutzt auf allen Marketing-Seiten.

### SEO
- Metadata API pro Seite (Title, Description, Canonical, Open Graph)
- `src/app/sitemap.ts`, `src/app/robots.ts`
- JSON-LD: LocalBusiness, Service, FAQPage, BreadcrumbList, Article (`src/lib/seo/jsonld.ts`)
- Programmatische Local-SEO-Seiten `/standorte/[city]` für jede NRW-Stadt in `serviceAreas`
- Dynamisch generiertes Open-Graph-Bild (`src/app/opengraph-image.tsx`)

### KI-Chat-Support
`src/components/chat/ChatWidget.tsx` + `src/app/api/chat/route.ts`. Nutzt
die Claude API mit Kontext aus den echten Geschäftsdaten. Ohne
`ANTHROPIC_API_KEY` zeigt der Chat einen freundlichen Fallback-Text mit
Kontaktmöglichkeiten statt eines Fehlers.

### Automatisierungs-Agents
Drei unabhängige CLI-Skripte unter `/agents` – Details in
[`agents/README.md`](./agents/README.md):

1. **content-agent** – schreibt neue SEO-Blogartikel-Entwürfe
2. **posting-agent** – erstellt Social-Media-Captions, kann optional live posten
3. **seo-agent** – crawlt die Sitemap und erstellt einen priorisierten SEO-Maßnahmenplan

```bash
npm run agent:content -- --count 1
npm run agent:posting -- --slug <slug>
npm run agent:seo -- --url http://localhost:3000
```

## Deployment

Empfohlen: [Vercel](https://vercel.com) (Next.js-Hersteller) oder jeder
Node.js-fähige Host. Wichtig:
- Umgebungsvariablen aus `.env.example` im Hosting-Dashboard setzen (insb. `AUTH_SECRET`, `ANTHROPIC_API_KEY`).
- `.data/` muss persistent beschreibbar sein (bei serverlosen Plattformen ggf. auf eine externe DB migrieren).
- Domain in `src/lib/content/business.ts` (`domain`) auf die echte Produktions-URL setzen.

## Projektstruktur

```
src/app/              Next.js App Router (Seiten, API-Routen, SEO-Dateien)
src/components/       UI-Komponenten (layout, sections, forms, chat, motion)
src/lib/content/      Zentrale Geschäftsdaten, Leistungen, Blog-Inhalte
src/lib/db/           node:sqlite Datenzugriff (users, contact_messages)
src/lib/auth/         Session-/Passwort-Logik
src/actions/          Server Actions (Auth, Kontaktformular)
src/proxy.ts           Routenschutz (Next 16: proxy statt middleware)
agents/                Content-, Posting- und SEO-Automatisierung (CLI)
```
