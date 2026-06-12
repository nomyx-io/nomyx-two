import type { MetadataRoute } from "next";

import { getPublishedBlogs } from "@/lib/blogs";
import { getPublishedNews } from "@/lib/news";
import { getAllAuthors } from "@/lib/authors";

const siteUrl = "https://www.nomyx.io";

const staticRoutes = [
  "",
  "/blog",
  "/news",
  "/developers",
  "/evergreen-open-ended-funds",
  "/legal-documents/blockchain-terms",
  "/legal-documents/cookie-notice",
  "/legal-documents/dpa",
  "/legal-documents/enterprise-services",
  "/legal-documents/in-product-cookie-policy",
  "/legal-documents/innovation-services",
  "/legal-documents/msa",
  "/legal-documents/privacy-notice",
  "/legal-documents/professional-services",
  "/legal-documents/promotional-credit-policy",
  "/legal-documents/securities-addendum",
  "/legal-documents/terms-of-use",
  "/legal-documents/trademark-usage-guidelines",
  "/legal-documents/user-content-and-conduct-policy",
  "/nomyx-engine",
  "/nomyx-gateway",
  "/nomyx-id",
  "/private-credit-syndication",
  "/real-estate-tokenization",
  "/technical-documentation",
  "/spv-deal-syndication",
  "/the-diamond-standard",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : (route === "/blog" || route === "/news") ? 0.8 : 0.7,
  }));

  try {
    const [blogs, news, authors] = await Promise.all([
      getPublishedBlogs().catch(() => []),
      getPublishedNews().catch(() => []),
      getAllAuthors().catch(() => []),
    ]);

    const blogEntries = blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const newsEntries = news.map((item) => ({
      url: `${siteUrl}/news/${item.slug}`,
      lastModified: item.published_at ? new Date(item.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const authorEntries = authors.map((author) => ({
      url: `${siteUrl}/blog/author/${author.slug}`,
      lastModified: author.updated_at ? new Date(author.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    return [...staticEntries, ...blogEntries, ...newsEntries, ...authorEntries];
  } catch {
    return staticEntries;
  }
}
