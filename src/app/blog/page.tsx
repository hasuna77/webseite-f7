import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { business } from "@/lib/content/business";
import { posts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Journal",
  description: `Ratgeber, Tipps und Hintergründe rund um Fotografie von ${business.name} – für Düsseldorf und ganz NRW.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <section className="bg-ink pb-20 pt-36 text-white lg:pt-44">
        <Container>
          <Eyebrow>Journal</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-display text-5xl sm:text-6xl">
            Gedanken, Tipps & Hintergründe.
          </h1>
        </Container>
      </section>

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
