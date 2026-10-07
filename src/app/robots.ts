import type { MetadataRoute } from "next";
import { business } from "@/lib/content/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
    ],
    sitemap: `${business.domain}/sitemap.xml`,
    host: business.domain,
  };
}
