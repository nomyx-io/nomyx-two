import { NextResponse } from "next/server";
import {
  deleteAuthor,
  deleteAuthorImage,
  getAuthorById,
  updateAuthor,
  uploadAuthorImage,
} from "@/lib/authors";
import { cmsUnauthorizedResponse, isCmsRequestAuthenticated } from "@/lib/cms-auth-server";
import { createClient } from "@supabase/supabase-js";

type Props = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const { id } = await params;
    const existing = await getAuthorById(id);

    if (!existing) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const slug = String(formData.get("slug") || "").trim() || undefined;
    const bioHtml = String(formData.get("bioHtml") || "").trim();
    const designation = formData.has("designation") ? String(formData.get("designation") || "").trim() || null : existing.designation;
    const metaDescription = formData.has("metaDescription") ? String(formData.get("metaDescription") || "").trim() || null : existing.meta_description;
    const pageTitle = formData.has("pageTitle") ? String(formData.get("pageTitle") || "").trim() || null : existing.page_title;
    const removeImage = String(formData.get("removeImage")) === "true";
    const imageFile = formData.get("image");

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let coverImageUrl = existing.cover_image_url;
    let coverImagePath = existing.cover_image_path;

    if (removeImage && coverImagePath) {
      await deleteAuthorImage(coverImagePath);
      coverImageUrl = null;
      coverImagePath = null;
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      if (coverImagePath && !removeImage) {
        await deleteAuthorImage(coverImagePath);
      }
      const upload = await uploadAuthorImage(imageFile, name);
      coverImageUrl = upload.url;
      coverImagePath = upload.path;
    }

    const author = await updateAuthor(id, {
      name,
      slug,
      bioHtml: bioHtml || null,
      designation,
      coverImageUrl,
      coverImagePath,
      metaDescription,
      pageTitle,
    });

    return NextResponse.json({ author });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update author";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const { id } = await params;
    
    // Check if any blogs use this author
    const url = new URL(request.url);
    const transferToId = url.searchParams.get("transferToAuthorId");
    
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (transferToId) {
      if (transferToId === "none") {
        await supabase.from("blog_posts").update({ author_id: null }).eq("author_id", id);
      } else {
        await supabase.from("blog_posts").update({ author_id: transferToId }).eq("author_id", id);
      }
    } else {
      // Check if there are blogs with this author to prevent deletion without transferring
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("author_id", id);
      if (count && count > 0) {
         return NextResponse.json({ error: `Cannot delete author. There are ${count} blog posts assigned to this author.` }, { status: 400 });
      }
    }

    await deleteAuthor(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete author";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
