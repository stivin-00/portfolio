import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: profile.site, lastModified, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${profile.site}/work/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: c.featured ? 0.9 : 0.7,
    })),
  ];
}
