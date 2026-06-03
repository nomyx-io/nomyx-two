import { NextResponse } from "next/server";

import { uploadImage } from "@/lib/blogs";
import { cmsUnauthorizedResponse, isCmsRequestAuthenticated } from "@/lib/cms-auth-server";

export async function POST(request: Request) {
  if (!(await isCmsRequestAuthenticated())) {
    return cmsUnauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");
    const title = String(formData.get("title") || "blog-content").trim();

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }

    const image = await uploadImage(imageFile, title);

    return NextResponse.json({ image });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
