"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Routen, die bewusst ohne die normale Seiten-Navigation/Footer auskommen –
 * z. B. eigenständige Landingpages für Social-Bio-Links.
 */
const BARE_PREFIXES = ["/links"];

export function ChromeGate({
  header,
  footer,
  chat,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  chat: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isBare = BARE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isBare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {chat}
    </>
  );
}
