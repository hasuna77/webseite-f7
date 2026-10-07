import { business, serviceAreas, services } from "@/lib/content/business";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${business.domain}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    // TODO: Sobald echte Studio-/Logo-Fotos vorliegen, hier `image` und
    // `logo` mit absoluten URLs ergänzen – wichtig für Rich Results.
    url: business.domain,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    foundingDate: business.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.zip,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: business.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.hours.split("–")[0]?.trim(),
      closes: entry.hours.split("–")[1]?.trim(),
    })),
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
    })),
    sameAs: Object.values(business.social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fotografie-Leistungen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
        priceCurrency: "EUR",
        price: service.priceFrom,
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  priceFrom: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description,
    provider: { "@id": `${business.domain}/#business` },
    areaServed: { "@type": "State", name: business.address.region },
    url: `${business.domain}/leistungen/${service.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.priceFrom,
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    ...(post.image ? { image: post.image } : {}),
    author: { "@type": "Organization", name: business.name },
    publisher: {
      "@type": "Organization",
      name: business.name,
    },
    mainEntityOfPage: `${business.domain}/blog/${post.slug}`,
  };
}
