/**
 * Geschäftsdaten für innoviadruck.de (Druckerei).
 *
 * innoviadruck.de ist nicht Teil dieses Repos (dieses Repo ist die Website
 * von F7 Studio) und war beim Erstellen dieser Datei unter dieser Domain
 * nicht erreichbar (kein DNS-Eintrag) – deshalb sind Adresse, Leistungen
 * und Preise unten nur Platzhalter für eine typische Online-Druckerei.
 *
 * Bitte VOR dem ersten echten Lauf mit den tatsächlichen Daten befüllen
 * (siehe TODO-Kommentare) – sonst generiert der Agent Texte mit falschen
 * Fakten.
 */

export const business = {
  name: "Innovia Druck", // TODO: exakten Firmennamen prüfen
  legalName: "Innovia Druck", // TODO: ggf. Rechtsform ergänzen (GmbH, e.K., ...)
  tagline: "Druckerei & Werbetechnik", // TODO: echten Slogan einsetzen
  shortDescription:
    "Druckerei für Flyer, Visitenkarten, Plakate, Banner und individuelle Drucksachen.", // TODO
  description:
    "Innovia Druck ist eine Druckerei, die Unternehmen und Privatkunden mit hochwertigen Druckprodukten beliefert – von Visitenkarten bis Großformatdruck.", // TODO
  email: "info@innoviadruck.de", // TODO: echte Adresse prüfen
  phone: "", // TODO: eintragen
  address: {
    street: "[Straße & Hausnummer einfügen]",
    zip: "[PLZ einfügen]",
    city: "[Stadt einfügen]",
    region: "[Bundesland einfügen]",
    country: "DE",
    countryName: "Deutschland",
  },
  social: {
    instagram: "", // TODO
    facebook: "", // TODO
    linkedin: "", // TODO
  },
  domain: "https://www.innoviadruck.de",
} as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
};

// Typische Leistungen einer Online-Druckerei – bitte an das echte
// Angebot von innoviadruck.de anpassen (Produkte entfernen/ergänzen,
// Beschreibungen schärfen).
export const services: Service[] = [
  {
    slug: "flyer-drucken",
    title: "Flyer & Flugblätter",
    summary: "Flyer in verschiedenen Formaten und Papierqualitäten für Werbung und Veranstaltungen.",
    keywords: ["Flyer drucken", "Flyer drucken lassen", "Flyer Druckerei"],
  },
  {
    slug: "visitenkarten-drucken",
    title: "Visitenkarten",
    summary: "Hochwertige Visitenkarten mit verschiedenen Veredelungen (Mattlaminat, Soft-Touch, Folienprägung).",
    keywords: ["Visitenkarten drucken", "Visitenkarten drucken lassen", "Visitenkarten Druckerei"],
  },
  {
    slug: "broschueren-kataloge",
    title: "Broschüren & Kataloge",
    summary: "Mehrseitige Broschüren und Kataloge, geheftet oder klebegebunden.",
    keywords: ["Broschüren drucken", "Kataloge drucken lassen"],
  },
  {
    slug: "plakate-grossformat",
    title: "Plakate & Großformatdruck",
    summary: "Plakate, Poster und Großformatdrucke für Werbung und Events.",
    keywords: ["Plakate drucken", "Großformatdruck", "Poster drucken lassen"],
  },
  {
    slug: "banner-werbetechnik",
    title: "Banner & Werbetechnik",
    summary: "Werbebanner, Roll-ups und Beschriftungen für Schaufenster und Messen.",
    keywords: ["Banner drucken", "Roll-up drucken lassen", "Werbebanner Druckerei"],
  },
  {
    slug: "aufkleber-etiketten",
    title: "Aufkleber & Etiketten",
    summary: "Individuell zugeschnittene Aufkleber und Etiketten in verschiedenen Materialien.",
    keywords: ["Aufkleber drucken", "Etiketten drucken lassen"],
  },
  {
    slug: "geschaeftsausstattung",
    title: "Briefpapier & Geschäftsausstattung",
    summary: "Briefbögen, Briefumschläge und komplette Geschäftsausstattung im einheitlichen Corporate Design.",
    keywords: ["Briefpapier drucken", "Geschäftsausstattung drucken lassen"],
  },
];

export const seoKeywords = {
  primary: ["Druckerei", "Online Druckerei", "Druckservice"],
  local: [
    // TODO: Stadt/Region aus address.city / address.region einsetzen,
    // z.B. "Druckerei Köln", "Online Druckerei NRW"
    "Druckerei [Stadt]",
    "Online Druckerei [Region]",
  ],
  longTail: [
    "Flyer drucken lassen günstig",
    "Visitenkarten drucken lassen online",
    "Großformatdruck für Messen und Events",
    "Druckerei für kleine Auflagen",
  ],
};
