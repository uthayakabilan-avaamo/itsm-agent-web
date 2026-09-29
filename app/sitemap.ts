import type { MetadataRoute } from "next";
import { TROUBLESHOOTING_PRODUCTS } from "@/components/docs/troubleshootingProducts";

const SITE_URL = "https://itsm-agent-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const troubleshootingPages: MetadataRoute.Sitemap = TROUBLESHOOTING_PRODUCTS.map(
    (product) => ({
      url: `${SITE_URL}/docs/troubleshooting/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...troubleshootingPages,
    {
      url: `${SITE_URL}/assistant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
