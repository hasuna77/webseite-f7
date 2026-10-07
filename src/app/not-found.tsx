import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="font-display text-7xl text-green">404</span>
      <h1 className="mt-4 font-display text-3xl text-ink">Seite nicht gefunden</h1>
      <p className="mt-3 max-w-sm text-ink-soft/70">
        Die gesuchte Seite existiert nicht mehr oder wurde verschoben.
      </p>
      <div className="mt-8 flex gap-4">
        <LinkButton href="/">Zur Startseite</LinkButton>
        <Link
          href="/kontakt"
          className="inline-flex items-center rounded-full border border-ink/20 px-7 py-3 text-sm font-medium text-ink hover:border-green hover:text-green"
        >
          Kontakt
        </Link>
      </div>
    </section>
  );
}
