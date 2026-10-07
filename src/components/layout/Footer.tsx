import Link from "next/link";
import { Camera } from "lucide-react";
import { business, serviceAreas } from "@/lib/content/business";
import { SocialBadge } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-xl text-white">
              <Camera className="h-5 w-5 text-green-light" strokeWidth={1.5} />
              {business.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {business.shortDescription}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="text-white/60 transition-colors hover:text-green-light"
              >
                <SocialBadge label="IG" />
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="text-white/60 transition-colors hover:text-green-light"
              >
                <SocialBadge label="FB" />
              </a>
              <a
                href={business.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="text-white/60 transition-colors hover:text-green-light"
              >
                <SocialBadge label="in" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white/50">
              Leistungen
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/leistungen/portraitfotografie" className="hover:text-green-light">Portraitfotografie</Link></li>
              <li><Link href="/leistungen/businessfotografie" className="hover:text-green-light">Business-Fotos</Link></li>
              <li><Link href="/leistungen/hochzeitsfotografie" className="hover:text-green-light">Hochzeitsfotografie</Link></li>
              <li><Link href="/leistungen/produktfotografie" className="hover:text-green-light">Produktfotografie</Link></li>
              <li><Link href="/leistungen/eventfotografie" className="hover:text-green-light">Eventfotografie</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white/50">
              Fotograf in NRW
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {serviceAreas.slice(0, 8).map((area) => (
                <li key={area.slug}>
                  <Link href={`/standorte/${area.slug}`} className="hover:text-green-light">
                    {area.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white/50">
              Kontakt
            </h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-white/70">
              <p>{business.address.street}</p>
              <p>
                {business.address.zip} {business.address.city}
              </p>
              <p>
                <a href={`tel:${business.phone}`} className="hover:text-green-light">
                  {business.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${business.email}`} className="hover:text-green-light">
                  {business.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {business.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-green-light">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-green-light">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
