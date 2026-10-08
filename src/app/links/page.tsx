import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/content/business";
import { SocialBadge } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Links",
  description: `Alle wichtigen Links von ${business.name} an einem Ort – Portfolio, Leistungen, Termine und Social Media.`,
  alternates: { canonical: "/links" },
  robots: { index: true, follow: true },
};

type ArchiveEntry = {
  index: string;
  title: string;
  caption: string;
  href: string;
  external?: boolean;
};

const ENTRIES: ArchiveEntry[] = [
  {
    index: "01",
    title: "Portfolio",
    caption: "Ausgewählte Arbeiten & aktuelle Projekte",
    href: "/galerie",
  },
  {
    index: "02",
    title: "Videografie & Reels",
    caption: "Hochzeits-Reels, Instagram- & TikTok-Content",
    href: "/leistungen/videografie",
  },
  {
    index: "03",
    title: "Leistungen & Preise",
    caption: "Foto & Video für jeden Anlass",
    href: "/leistungen",
  },
  {
    index: "04",
    title: "Termin anfragen",
    caption: "Jetzt Shooting sichern",
    href: "/kontakt",
  },
  {
    index: "05",
    title: "Instagram",
    caption: "Neueste Eindrücke & Behind the Scenes",
    href: business.social.instagram,
    external: true,
  },
];

export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-white">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-16 sm:py-20">
        <div className="animate-fade-up flex flex-col items-center text-center">
          <Link href="/" className="inline-flex rounded-2xl bg-paper px-5 py-3">
            <Image
              src="/logo.png"
              alt={business.name}
              width={1000}
              height={362}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            {business.tagline} · {business.address.city}
          </p>
        </div>

        <nav className="mt-14 flex flex-col">
          {ENTRIES.map((entry, i) => (
            <Link
              key={entry.href}
              href={entry.href}
              target={entry.external ? "_blank" : undefined}
              rel={entry.external ? "noreferrer noopener" : undefined}
              className="group animate-fade-up flex items-center gap-5 border-t border-white/10 py-6 transition-colors hover:bg-white/[0.03] sm:gap-8"
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              <span className="font-display text-sm text-white/30 transition-colors group-hover:text-green-light sm:text-base">
                {entry.index}
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl text-white transition-colors group-hover:text-green-light sm:text-2xl">
                  {entry.title}
                </h2>
                <p className="mt-1 text-sm text-white/50">{entry.caption}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-green-light" />
            </Link>
          ))}
          <div className="border-t border-white/10" />
        </nav>

        <div className="mt-14 flex flex-1 flex-col items-center justify-end gap-6 text-center">
          <div className="flex gap-4 text-white/50">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="transition-colors hover:text-green-light"
            >
              <SocialBadge label="IG" />
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="transition-colors hover:text-green-light"
            >
              <SocialBadge label="FB" />
            </a>
            <a
              href={business.social.tiktok}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="TikTok"
              className="transition-colors hover:text-green-light"
            >
              <SocialBadge label="TT" />
            </a>
          </div>
          <Link href="/" className="text-xs uppercase tracking-[0.25em] text-white/40 hover:text-white/70">
            Zur vollständigen Website →
          </Link>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {business.legalName}
          </p>
        </div>
      </div>
    </div>
  );
}
