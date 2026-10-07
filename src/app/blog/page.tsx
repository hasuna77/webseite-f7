import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { business } from "@/lib/content/business";
import { posts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: `Ratgeber, Tipps und Hintergründe rund um Fotografie von ${business.name} – für Ennepetal und ganz NRW.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <PageHero eyebrow="Journal" title="Gedanken, Tipps & Hintergründe." />

      <section className="bg-paper py-20 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-beige-dark/30 bg-paper-soft p-8 transition-all hover:border-green/40 hover:shadow-soft"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-green">
                  {post.category}
                </span>
                <h2 className="mt-3 font-display text-2xl text-ink">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-ink-soft/60">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {post.readingMinutes} Min. Lesezeit
                </span>
                <ArrowUpRight className="h-4 w-4 text-green opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}
