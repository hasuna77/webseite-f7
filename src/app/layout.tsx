import type { Metadata } from "next";
import { Bodoni_Moda, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { business, seoKeywords } from "@/lib/content/business";
import { localBusinessJsonLd } from "@/lib/seo/jsonld";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: `${business.name} – Fotostudio in ${business.address.city} & ganz NRW`,
    template: `%s – ${business.name}`,
  },
  description: business.shortDescription,
  keywords: [...seoKeywords.primary, ...seoKeywords.local, ...seoKeywords.longTail],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  category: "Photography",
  alternates: {
    canonical: "/",
    languages: { "de-DE": "/" },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: business.domain,
    siteName: business.name,
    title: `${business.name} – Fotostudio in ${business.address.city} & ganz NRW`,
    description: business.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} – Fotostudio in ${business.address.city} & ganz NRW`,
    description: business.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bodoni.variable} ${workSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <ChromeGate header={<Header />} footer={<Footer />} chat={<ChatWidget />}>
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}
