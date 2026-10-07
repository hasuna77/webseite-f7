import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { business } from "@/lib/content/business";
import { posts } from "@/lib/content/posts";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${business.domain}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Start", url: business.domain },
              { name: "Journal", url: `${business.domain}/blog` },
              { name: post.title, url: `${business.domain}/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <article className="bg-paper pb-24 pt-36 lg:pt-44">
        <Container className="max-w-2xl">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-soft/60">
            {new Date(post.publishedAt).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingMinutes} Min. Lesezeit
          </p>

          <div className="prose-custom mt-10 space-y-8">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl text-ink">{section.heading}</h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mt-3 leading-relaxed text-ink-soft/85">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-beige-dark/30 pt-8">
            <Link href="/blog" className="text-sm font-medium text-green hover:underline">
              ← Zurück zum Journal
            </Link>
          </div>
        </Container>
      </article>

      <CTASection />
    </>
  );
}
