import { slugify } from "@/lib/blogs";

export type BlogHeading = {
  id: string;
  level: 2 | 3;
  text: string;
};

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

export function enhanceBlogHtml(html: string) {
  const headings: BlogHeading[] = [];
  const idCounts = new Map<string, number>();

  const content = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, level, attributes, innerHtml) => {
    const numericLevel = Number(level) as 2 | 3;
    const text = stripTags(innerHtml);
    const baseId = slugify(text || `section-${headings.length + 1}`) || `section-${headings.length + 1}`;
    const seenCount = idCounts.get(baseId) ?? 0;
    const nextCount = seenCount + 1;
    idCounts.set(baseId, nextCount);
    const id = seenCount === 0 ? baseId : `${baseId}-${nextCount}`;

    headings.push({ id, level: numericLevel, text });

    if (/id\s*=/.test(attributes)) {
      return `<h${level}${attributes}>${innerHtml}</h${level}>`;
    }

    return `<h${level}${attributes} id="${id}" data-toc-heading="true">${innerHtml}</h${level}>`;
  });

  return {
    content,
    headings,
  };
}
