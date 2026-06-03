import { NextResponse } from "next/server";

import {
  deleteBlog,
  deleteImage,
  getBlogById,
  normalizeBlogFaqs,
  normalizePublishedAt,
  updateBlog,
  uploadImage,
  type BlogStatus,
} from "@/lib/blogs";
import { cmsUnauthorizedResponse, isCmsRequestAuthenticated } from "@/lib/cms-auth-server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: Context) {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const { id } = await context.params;
    const existing = await getBlogById(id);

    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const title = String(formData.get("title") || existing.title).trim();
    const publishedAtInput = String(formData.get("publishedAt") || existing.published_at || "").trim();
    const contentHtml = String(formData.get("contentHtml") || existing.content_html).trim();
    const faqs = normalizeBlogFaqs(String(formData.get("faqs") || JSON.stringify(existing.faqs || [])));
    const featured = String(formData.get("featured") || String(existing.featured)) === "true";
    const status = String(formData.get("status") || existing.status) as BlogStatus;
    const removeImage = String(formData.get("removeImage") || "false") === "true";
    const imageFile = formData.get("image");

    let coverImageUrl = existing.cover_image_url;
    let coverImagePath = existing.cover_image_path;

    if (removeImage && coverImagePath) {
      await deleteImage(coverImagePath);
      coverImageUrl = null;
      coverImagePath = null;
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      if (coverImagePath) {
        await deleteImage(coverImagePath);
      }

      const upload = await uploadImage(imageFile, title);
      coverImageUrl = upload.url;
      coverImagePath = upload.path;
    }

    const blog = await updateBlog(id, {
      title,
      publishedAt: normalizePublishedAt(publishedAtInput || null, status),
      contentHtml,
      faqs,
      featured,
      status,
      coverImageUrl,
      coverImagePath,
    });

    return NextResponse.json({ blog });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: Context) {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const { id } = await context.params;
    await deleteBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
