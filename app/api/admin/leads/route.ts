import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/leads";

export async function GET() {
  try {
    const leads = await getAllLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load leads";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
