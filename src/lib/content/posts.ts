export type PostSection = { heading?: string; paragraphs: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  sections: PostSection[];
};

/**
 * Start-Artikel für das Journal/Blog. Diese Inhalte sind redaktionell
 * nutzbar (keine Platzhalter) und für lokale SEO-Keywords geschrieben.
 * Der Content-Agent (siehe /agents/content-agent) kann hier weitere
 * Einträge ergänzen.
 */
export const posts: Post[] = [
  {
    slug: "fotostudio-duesseldorf-worauf-achten",
    title: "Fotostudio in Düsseldorf wählen: 7 Dinge, auf die du achten solltest",
    description:
      "Worauf du bei der Wahl eines Fotostudios in Düsseldorf achten solltest – von Portfolio bis Preisgestaltung.",
    excerpt:
      "Die Auswahl an Fotostudios in Düsseldorf ist groß. Diese sieben Kriterien helfen dir, das passende Studio für dein Shooting zu finden.",
    category: "Ratgeber",
    publishedAt: "2026-01-15",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Ob Bewerbungsfoto, Hochzeit oder Produktshooting: Die Wahl des richtigen Fotostudios entscheidet maßgeblich über das Ergebnis. In Düsseldorf gibt es eine große Auswahl an Fotograf:innen – hier sind sieben Kriterien, die dir bei der Entscheidung helfen.",
        ],
      },
      {
        heading: "1. Portfolio-Stil genau ansehen",
        paragraphs: [
          "Schau dir nicht nur Einzelbilder an, sondern ganze Shootings. So erkennst du, ob der Stil – natürlich, editorial, klassisch – zu dem passt, was du dir vorstellst.",
        ],
      },
      {
        heading: "2. Persönliches Kennenlernen vor dem Shooting",
        paragraphs: [
          "Ein kurzes Telefonat oder Vor-Ort-Gespräch zeigt, ob die Chemie stimmt. Gerade bei Portraits ist Vertrauen die halbe Miete für entspannte, natürliche Bilder.",
        ],
      },
      {
        heading: "3. Transparente Preisgestaltung",
        paragraphs: [
          "Seriöse Studios nennen Richtpreise, bevor du anfragst. Achte darauf, was im Preis enthalten ist: Anzahl bearbeiteter Bilder, Nutzungsrechte, Lieferzeit.",
        ],
      },
      {
        heading: "4. Ausstattung und Location",
        paragraphs: [
          "Ein professionelles Studio verfügt über variables Kunstlicht, verschiedene Hintergründe und – je nach Bedarf – die Möglichkeit für Outdoor-Shootings in der Umgebung.",
        ],
      },
      {
        heading: "5. Lieferzeit und Nachbearbeitung",
        paragraphs: [
          "Frag konkret nach der Lieferzeit und ob eine Grundretusche im Preis enthalten ist. Das erspart Überraschungen nach dem Shooting.",
        ],
      },
      {
        heading: "6. Bewertungen und Referenzen",
        paragraphs: [
          "Google-Bewertungen und Referenzen von echten Kund:innen geben dir einen ehrlichen Eindruck davon, wie verlässlich ein Studio arbeitet.",
        ],
      },
      {
        heading: "7. Erreichbarkeit und Flexibilität",
        paragraphs: [
          "Gerade bei Business- oder Eventfotografie zählt Flexibilität: Kann das Studio auch kurzfristig oder außerhalb der Geschäftszeiten shooten?",
        ],
      },
      {
        heading: "Fazit",
        paragraphs: [
          "Nimm dir Zeit für die Auswahl – ein gutes Fotostudio in Düsseldorf erkennst du an Transparenz, einem stimmigen Portfolio und echtem Interesse an deinem Anliegen.",
        ],
      },
    ],
  },
  {
    slug: "business-fotos-tipps-bewerbungsfoto",
    title: "Business-Fotos, die wirken: Tipps für dein nächstes Bewerbungsfoto",
    description:
      "So gelingt dein nächstes Business- oder Bewerbungsfoto: Vorbereitung, Kleidung und Haltung.",
    excerpt:
      "Ein gutes Business-Portrait öffnet Türen. Diese Tipps helfen dir, bei deinem nächsten Shooting optimal vorbereitet zu sein.",
    category: "Business",
    publishedAt: "2026-02-03",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Dein Business-Foto ist oft der erste Eindruck, den potenzielle Arbeitgeber:innen oder Kund:innen von dir bekommen – auf LinkedIn, der Firmenwebsite oder in der Bewerbungsmappe. Mit der richtigen Vorbereitung holst du das Beste heraus.",
        ],
      },
      {
        heading: "Kleidung bewusst wählen",
        paragraphs: [
          "Einfarbige, gedeckte Töne wirken auf Fotos ruhiger als starke Muster. Wähle Kleidung, in der du dich wohlfühlst – das überträgt sich auf deine Ausstrahlung.",
        ],
      },
      {
        heading: "Ausreichend Schlaf und Hydration",
        paragraphs: [
          "Klingt banal, macht aber einen sichtbaren Unterschied: Ausgeruhte Haut und klare Augen lassen sich kaum wegretuschieren.",
        ],
      },
      {
        heading: "Mimik vorher üben",
        paragraphs: [
          "Ein paar Minuten vor dem Spiegel helfen, ein natürliches Lächeln zu finden. Im Studio geben wir dir zusätzlich Posing-Anweisungen, die unsicher wirkende Haltungen vermeiden.",
        ],
      },
      {
        heading: "Konsistenz im Team",
        paragraphs: [
          "Für Unternehmen lohnt sich ein einheitlicher Hintergrund und Bildausschnitt für alle Teammitglieder – das wirkt professionell auf der Team-Seite.",
        ],
      },
      {
        heading: "Fazit",
        paragraphs: [
          "Ein gutes Business-Foto ist eine Investition, die sich auszahlt. Mit ein wenig Vorbereitung und einem erfahrenen Studio an deiner Seite ist der Aufwand überschaubar – das Ergebnis hält dafür Jahre.",
        ],
      },
    ],
  },
  {
    slug: "hochzeitsfotograf-nrw-checkliste",
    title: "Hochzeitsfotograf in NRW buchen: Die ultimative Checkliste",
    description:
      "Checkliste für die Buchung eines Hochzeitsfotografen in Nordrhein-Westfalen – von der Anfrage bis zum Hochzeitstag.",
    excerpt:
      "Von der ersten Anfrage bis zum großen Tag: Diese Checkliste hilft dir, rechtzeitig den passenden Hochzeitsfotografen in NRW zu finden.",
    category: "Hochzeit",
    publishedAt: "2026-02-20",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Gute Hochzeitsfotograf:innen sind oft Monate im Voraus ausgebucht. Diese Checkliste hilft dir, den Prozess strukturiert anzugehen.",
        ],
      },
      {
        heading: "6–12 Monate vorher: Recherche & Vorauswahl",
        paragraphs: [
          "Schau dir vollständige Hochzeitsreportagen an (nicht nur Einzelbilder) und achte auf einen Stil, der zu eurer Hochzeit passt – dokumentarisch, klassisch oder editorial.",
        ],
      },
      {
        heading: "Kennenlerngespräch vereinbaren",
        paragraphs: [
          "Ein persönliches oder virtuelles Gespräch zeigt, ob die Chemie stimmt. Ihr verbringt den ganzen Tag mit dieser Person – Sympathie ist kein weiches Kriterium, sondern entscheidend.",
        ],
      },
      {
        heading: "Leistungsumfang klären",
        paragraphs: [
          "Wie viele Stunden sind inklusive? Gibt es einen Zweitfotografen? Wie läuft die Bildauswahl? Ist ein Fotobuch Teil des Pakets? Lasst euch alles schriftlich bestätigen.",
        ],
      },
      {
        heading: "Vertrag & Anzahlung prüfen",
        paragraphs: [
          "Seriöse Anbieter arbeiten mit klaren Verträgen inklusive Stornobedingungen. Das schützt beide Seiten.",
        ],
      },
      {
        heading: "4–6 Wochen vorher: Zeitplan abstimmen",
        paragraphs: [
          "Teilt dem Fotografen/der Fotografin den Ablaufplan des Tages mit – Trauung, Lichtbedingungen, wichtige Familienfotos. So geht am Tag selbst nichts unter.",
        ],
      },
      {
        heading: "Nach der Hochzeit",
        paragraphs: [
          "Fragt nach der Lieferzeit für die Online-Galerie und klärt, wie lange die Bilder gespeichert bleiben. Ein Backup eurer Lieblingsbilder lohnt sich immer.",
        ],
      },
      {
        heading: "Fazit",
        paragraphs: [
          "Mit genug Vorlauf und klaren Absprachen wird die Suche nach dem passenden Hochzeitsfotografen in NRW entspannt – und ihr könnt euch auf das Wesentliche freuen: euren Tag.",
        ],
      },
    ],
  },
];
