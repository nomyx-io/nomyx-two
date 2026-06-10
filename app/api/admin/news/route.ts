import { NextResponse } from "next/server";
import { createNews, getAllNewsForAdmin, normalizePublishedAt, uploadImage, type NewsStatus } from "@/lib/news";
import { cmsUnauthorizedResponse, isCmsRequestAuthenticated } from "@/lib/cms-auth-server";

export async function GET() {
  if (!(await isCmsRequestAuthenticated())) return cmsUnauthorizedResponse();
  try {
    const news = await getAllNewsForAdmin();
    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isCmsRequestAuthenticated())) return cmsUnauthorizedResponse();
  try {
    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const slug = String(formData.get("slug") || "").trim();
    const pageTitle = formData.has("pageTitle") ? String(formData.get("pageTitle") || "").trim() || null : null;
    const excerpt = String(formData.get("excerpt") || "").trim();
    const publishedAtInput = String(formData.get("publishedAt") || "").trim();
    const contentHtml = String(formData.get("contentHtml") || "").trim();
    const categoryId = formData.get("categoryId") ? String(formData.get("categoryId")) : null;
    const featured = String(formData.get("featured") || "false") === "true";
    const status = String(formData.get("status") || "draft") as NewsStatus;
    const imageFile = formData.get("image");

    if (!title || !contentHtml) return NextResponse.json({ error: "Title and content required" }, { status: 400 });

    let coverImageUrl = null, coverImagePath = null;
    if (imageFile instanceof File && imageFile.size > 0) {
      const upload = await uploadImage(imageFile, title);
      coverImageUrl = upload.url; coverImagePath = upload.path;
    }

    const newsItem = await createNews({
      title, slug, excerpt, publishedAt: normalizePublishedAt(publishedAtInput || null, status),
      contentHtml, featured, status, coverImageUrl, coverImagePath, categoryId, pageTitle
    });
    return NextResponse.json({ newsItem });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}
