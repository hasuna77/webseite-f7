import type { MetadataRoute } from "next";
import { business, services } from "@/lib/content/business";
import { posts } from "@/lib/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: business.domain, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${business.domain}/leistungen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${business.domain}/galerie`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${business.domain}/ueber-uns`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${business.domain}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${business.domain}/links`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${business.domain}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${business.domain}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${business.domain}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${business.domain}/leistungen/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${business.domain}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
