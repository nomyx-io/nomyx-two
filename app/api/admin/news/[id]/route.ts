import { NextResponse } from "next/server";
import { deleteNews, updateNews, normalizePublishedAt, uploadImage, deleteImage, getNewsById, type NewsStatus } from "@/lib/news";
import { cmsUnauthorizedResponse, isCmsRequestAuthenticated } from "@/lib/cms-auth-server";

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!(await isCmsRequestAuthenticated())) return cmsUnauthorizedResponse();
  try {
    const params = await props.params;
    const id = params.id;
    const existing = await getNewsById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const slug = String(formData.get("slug") || "").trim();
    const pageTitle = formData.has("pageTitle") ? String(formData.get("pageTitle") || "").trim() || null : existing.page_title;
    const excerpt = String(formData.get("excerpt") || "").trim();
    const publishedAtInput = String(formData.get("publishedAt") || "").trim();
    const contentHtml = String(formData.get("contentHtml") || "").trim();
    const categoryId = formData.get("categoryId") && formData.get("categoryId") !== "null" ? String(formData.get("categoryId")) : null;
    const featured = String(formData.get("featured") || "false") === "true";
    const status = String(formData.get("status") || "draft") as NewsStatus;
    const imageFile = formData.get("image");
    const removeImage = String(formData.get("removeImage") || "false") === "true";

    if (!title || !contentHtml) return NextResponse.json({ error: "Title and content required" }, { status: 400 });

    let coverImageUrl = existing.cover_image_url;
    let coverImagePath = existing.cover_image_path;

    if (removeImage && coverImagePath) {
      await deleteImage(coverImagePath);
      coverImageUrl = null; coverImagePath = null;
    } else if (imageFile instanceof File && imageFile.size > 0) {
      if (coverImagePath) await deleteImage(coverImagePath);
      const upload = await uploadImage(imageFile, title);
      coverImageUrl = upload.url; coverImagePath = upload.path;
    }

    const newsItem = await updateNews(id, {
      title, slug, excerpt, publishedAt: normalizePublishedAt(publishedAtInput || null, status),
      contentHtml, featured, status, coverImageUrl, coverImagePath, categoryId, pageTitle
    });
    return NextResponse.json({ newsItem });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, props: { params: Promise<{ id: string }> }) {
  if (!(await isCmsRequestAuthenticated())) return cmsUnauthorizedResponse();
  try {
    const params = await props.params;
    await deleteNews(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}
