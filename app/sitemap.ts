import type { MetadataRoute } from "next";

import { getPublishedBlogs } from "@/lib/blogs";

const siteUrl = "https://www.nomyx.io";

const staticRoutes = [
  "",
  "/blog",
  "/developers",
  "/evergreen-open-ended-funds",
  "/legal-documents/blockchain-terms",
  "/legal-documents/cookie-notice",
  "/legal-documents/dpa",
  "/legal-documents/msa",
  "/legal-documents/privacy-notice",
  "/legal-documents/securities-addendum",
  "/legal-documents/terms-of-use",
  "/nomyx-engine",
  "/nomyx-gateway",
  "/nomyx-id",
  "/private-credit-syndication",
  "/real-estate-tokenization",
  "/resources",
  "/spv-deal-syndication",
  "/the-diamond-standard",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/blog" ? 0.8 : 0.7,
  }));

  try {
    const blogs = await getPublishedBlogs();
    const blogEntries = blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticEntries, ...blogEntries];
  } catch {
    return staticEntries;
  }
}
