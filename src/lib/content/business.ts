/**
 * Zentrale Geschäftsdaten.
 *
 * WICHTIG: Dies sind Platzhalterdaten. Für echtes lokales SEO (Google Maps,
 * "Fotostudio NRW", "Fotograf <Stadt>") MÜSSEN Name, Adresse, Telefonnummer
 * (NAP) exakt mit deinem Google-Unternehmensprofil übereinstimmen. Ersetze
 * die Werte hier – sie werden automatisch in Metadaten, JSON-LD (strukturierte
 * Daten), Footer und Kontaktseite verwendet.
 */

export const business = {
  name: "F7 Studio",
  legalName: "F7 Studio",
  tagline: "Fotografie mit Haltung.",
  shortDescription:
    "Hochwertige Portrait-, Business-, Hochzeits- und Produktfotografie in Düsseldorf – und in ganz Nordrhein-Westfalen.",
  description:
    "F7 Studio ist ein inhabergeführtes Fotostudio in Düsseldorf. Wir fotografieren Menschen, Marken und Momente mit einem klaren, zeitlosen Stil.",
  founded: "2016",
  email: "studio@f7studio.de",
  phone: "+49 211 1234 5678",
  phoneDisplay: "0211 1234 5678",
  whatsapp: "+4921112345678",
  address: {
    street: "Kronprinzenstraße 12",
    zip: "40213",
    city: "Düsseldorf",
    region: "Nordrhein-Westfalen",
    country: "DE",
    countryName: "Deutschland",
  },
  geo: {
    lat: 51.2254,
    lng: 6.7763,
  },
  openingHours: [
    { days: "Mo–Fr", hours: "09:00–18:00" },
    { days: "Sa", hours: "10:00–14:00 (nach Vereinbarung)" },
    { days: "So", hours: "geschlossen" },
  ],
  priceRange: "€€–€€€",
  social: {
    instagram: "https://instagram.com/f7studio",
    facebook: "https://facebook.com/f7studio",
    tiktok: "https://tiktok.com/@f7studio",
    pinterest: "https://pinterest.com/f7studio",
    linkedin: "https://linkedin.com/company/f7studio",
    googleBusiness: "https://g.page/f7studio",
  },
  domain: "https://www.f7studio.de",
} as const;

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  priceFrom: number;
  durationMinutes: number;
  features: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "portraitfotografie",
    title: "Portraitfotografie",
    shortTitle: "Portraits",
    summary:
      "Authentische Portraits, die Persönlichkeit zeigen – im Studio oder an deinem Wunschort.",
    description:
      "Ob klassisches Portrait, Editorial oder Familienbild: Wir nehmen uns Zeit für dich, arbeiten mit natürlichem und gesetztem Licht und liefern zeitlose Bilder statt Trend-Filter.",
    priceFrom: 189,
    durationMinutes: 60,
    features: [
      "Persönliches Vorgespräch",
      "Professionelles Studiolicht",
      "Styling- & Posing-Beratung",
      "Bildauswahl & Retusche inklusive",
    ],
    keywords: ["Portraitfotograf", "Portraitfotos", "Fotograf für Portraits NRW"],
  },
  {
    slug: "businessfotografie",
    title: "Business- & Bewerbungsfotografie",
    shortTitle: "Business",
    summary: "Professionelle Headshots für Bewerbung, LinkedIn, Team- und Unternehmensseiten.",
    description:
      "Ein starkes erstes Bild entscheidet. Wir fotografieren Einzelpersonen und ganze Teams mit konsistentem Look – schnell, professionell, planbar.",
    priceFrom: 149,
    durationMinutes: 30,
    features: [
      "Einheitlicher Look fürs ganze Team",
      "Express-Termine möglich",
      "Freigestellte Varianten für Web & Print",
      "Vor-Ort-Shootings im Unternehmen",
    ],
    keywords: ["Business Portraits", "Bewerbungsfotos", "LinkedIn Fotos", "Teamfotos NRW"],
  },
  {
    slug: "hochzeitsfotografie",
    title: "Hochzeitsfotografie",
    shortTitle: "Hochzeiten",
    summary: "Unaufdringliche, emotionale Begleitung eures schönsten Tages.",
    description:
      "Wir dokumentieren eure Hochzeit so, wie sie wirklich war – ehrlich, warm und ohne gestellte Posen. Von der Vorbereitung bis zum letzten Tanz.",
    priceFrom: 1290,
    durationMinutes: 480,
    features: [
      "Ganztägige Begleitung",
      "Zweitfotograf optional",
      "Online-Galerie für Gäste",
      "Premium-Fotobuch optional",
    ],
    keywords: ["Hochzeitsfotograf NRW", "Hochzeitsfotos Düsseldorf"],
  },
  {
    slug: "produktfotografie",
    title: "Produkt- & E-Commerce-Fotografie",
    shortTitle: "Produkte",
    summary: "Saubere, verkaufsstarke Produktbilder für Shop, Amazon & Social Media.",
    description:
      "Konsistente Produktbilder auf weißem Grund, im Lifestyle-Setting oder als 360°-Ansicht – optimiert für Konvertierung und schnelle Ladezeiten.",
    priceFrom: 29,
    durationMinutes: 15,
    features: [
      "Freisteller auf Weiß/Transparent",
      "Lifestyle- & Flatlay-Setups",
      "Bulk-Preise für größere Mengen",
      "Web-optimierte Formate inklusive",
    ],
    keywords: ["Produktfotografie", "E-Commerce Fotos", "Amazon Produktbilder"],
  },
  {
    slug: "eventfotografie",
    title: "Eventfotografie",
    shortTitle: "Events",
    summary: "Diskrete, stilvolle Begleitung von Firmenevents, Konferenzen und Feiern.",
    description:
      "Wir fangen Atmosphäre, Menschen und Momente eures Events ein – für Recap-Videos, Social Media und interne Kommunikation.",
    priceFrom: 390,
    durationMinutes: 180,
    features: [
      "Flexible Buchung nach Stunden",
      "Same-Day-Vorschau möglich",
      "Lizenz für Social Media & Web",
      "Teamfotografie vor Ort",
    ],
    keywords: ["Eventfotograf NRW", "Firmenevent Fotograf", "Konferenzfotografie"],
  },
];

export const seoKeywords = {
  primary: ["Fotostudio", "Fotograf", "Fotografen"],
  local: [
    "Fotostudio Düsseldorf",
    "Fotograf Düsseldorf",
    "Fotostudio NRW",
    "Fotograf Nordrhein-Westfalen",
    "Fotografen NRW",
    "Fotostudio in meiner Nähe",
  ],
  longTail: [
    "professionelles Fotostudio Düsseldorf",
    "Business Portraitfotograf NRW",
    "Hochzeitsfotograf Nordrhein-Westfalen",
    "Bewerbungsfotos Düsseldorf",
  ],
};
