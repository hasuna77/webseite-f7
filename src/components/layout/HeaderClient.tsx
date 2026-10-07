"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import type { SessionPayload } from "@/lib/auth/jwt";

const NAV_LINKS = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/blog", label: "Journal" },
  { href: "/kontakt", label: "Kontakt" },
];

export function HeaderClient({
  session,
  businessName,
}: {
  session: SessionPayload | null;
  businessName: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border transition-all duration-500 ${
          scrolled || open
            ? "border-beige-dark/40 bg-paper/90 px-5 py-2.5 shadow-soft backdrop-blur-md"
            : "border-transparent bg-paper/70 px-6 py-3.5 backdrop-blur-sm"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt={businessName}
            width={1000}
            height={362}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide text-ink-soft transition-colors hover:text-green ${
                pathname === link.href ? "text-green" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm tracking-wide text-ink-soft transition-colors hover:text-green"
              >
                {session.name.split(" ")[0]}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm tracking-wide text-ink-soft transition-colors hover:text-green"
                >
                  Abmelden
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm tracking-wide text-ink-soft transition-colors hover:text-green"
            >
              Anmelden
            </Link>
          )}
          <Link
            href="/kontakt"
            className="rounded-full bg-green px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] hover:bg-green-dark"
          >
            Termin anfragen
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menü öffnen"
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-[1.75rem] border border-beige-dark/40 bg-paper px-6 pb-8 pt-4 shadow-soft lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-base text-ink-soft hover:text-green">
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-beige-dark/30 pt-4">
              {session ? (
                <>
                  <Link href="/dashboard" className="text-base text-ink-soft hover:text-green">
                    Mein Konto
                  </Link>
                  <form action={logoutAction}>
                    <button type="submit" className="text-left text-base text-ink-soft hover:text-green">
                      Abmelden
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-base text-ink-soft hover:text-green">
                    Anmelden
                  </Link>
                  <Link href="/register" className="text-base text-ink-soft hover:text-green">
                    Konto erstellen
                  </Link>
                </>
              )}
              <Link
                href="/kontakt"
                className="w-fit rounded-full bg-green px-5 py-2.5 text-sm font-medium text-white"
              >
                Termin anfragen
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
