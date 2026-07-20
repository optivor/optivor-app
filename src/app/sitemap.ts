import { MetadataRoute } from "next";
import { DOCS_DATA } from "@/lib/docs-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://optivor-app.pages.dev";

  const docUrls = Object.keys(DOCS_DATA).map((slug) => ({
    url: `${baseUrl}/docs/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...docUrls,
  ];
}
