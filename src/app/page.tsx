import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { ScrollImageReveal } from "@/components/motion/ScrollImageReveal";
import { ScrollScrubVideo } from "@/components/motion/ScrollScrubVideo";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
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
      <ScrollImageReveal imageSrc="/gallery/havex.jpg" imageAlt="HAVEX Markendesign von F7 Studio" />
      <Stats />
      <ServicesGrid />
      <ScrollScrubVideo />
      <Process />
      <GalleryPreview />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
