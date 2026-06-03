import { NextResponse } from "next/server";

import {
  createBlog,
  getAllBlogsForAdmin,
  normalizeBlogFaqs,
  normalizePublishedAt,
  uploadImage,
  type BlogStatus,
} from "@/lib/blogs";
import { cmsUnauthorizedResponse, isCmsRequestAuthenticated } from "@/lib/cms-auth-server";

export async function GET() {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const blogs = await getAllBlogsForAdmin();
    return NextResponse.json({ blogs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load blogs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const publishedAtInput = String(formData.get("publishedAt") || "").trim();
    const contentHtml = String(formData.get("contentHtml") || "").trim();
    const faqs = normalizeBlogFaqs(String(formData.get("faqs") || "[]"));
    const featured = String(formData.get("featured") || "false") === "true";
    const status = String(formData.get("status") || "draft") as BlogStatus;
    const imageFile = formData.get("image");

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!contentHtml) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    let coverImageUrl: string | null = null;
    let coverImagePath: string | null = null;

    if (imageFile instanceof File && imageFile.size > 0) {
      const upload = await uploadImage(imageFile, title);
      coverImageUrl = upload.url;
      coverImagePath = upload.path;
    }

    const blog = await createBlog({
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
    const message = error instanceof Error ? error.message : "Failed to create blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
