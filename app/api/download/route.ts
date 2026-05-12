import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { saveLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    // Parse the body to ensure form data was sent
    const body = await req.json();
    const { fullName, email, company, resourceTitle } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Name and Email are required to access this resource." },
        { status: 400 }
      );
    }

    // Save the lead to the database
    try {
      await saveLead({ fullName, email, company, resourceTitle: resourceTitle || "Unknown" });
    } catch (dbError) {
      // We log the error but still allow the download to proceed
      console.error("Failed to save lead:", dbError);
    }

    // Path to the PDF file
    // Note: Since this runs on the server, we can access files in the app directory
    const filePath = path.join(process.cwd(), "app", "pdf", "Nomyx - Why Tokenize My Fund.pdf");

    if (!fs.existsSync(filePath)) {
      console.error("PDF file not found at path:", filePath);
      return NextResponse.json({ error: "Resource not found." }, { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Return the file with correct headers for download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Nomyx-Why-Tokenize-My-Fund.pdf"',
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// Block GET requests to prevent direct URL access
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Please use the resource form." },
    { status: 405 }
  );
}
