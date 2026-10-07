import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { LocalSeoTeaser } from "@/components/sections/LocalSeoTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/lib/content/business";
import { FAQ_ITEMS } from "@/lib/content/faq";
import { faqJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: `Fotostudio ${business.address.city} | Fotograf für ganz NRW`,
  description: business.shortDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${business.name} – Fotostudio in ${business.address.city} & ganz NRW`,
    description: business.shortDescription,
    url: business.domain,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_ITEMS)) }}
      />
      <Hero />
      <Stats />
      <ServicesGrid />
      <Process />
      <GalleryPreview />
      <LocalSeoTeaser />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
