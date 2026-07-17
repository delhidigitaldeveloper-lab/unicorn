import { NextRequest, NextResponse } from "next/server";
import { updateSeoByPage } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: { page: string } }) {
  try {
    const body = await request.json();
    const updated = await updateSeoByPage(params.page, body);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update SEO error:", err);
    return NextResponse.json({ error: "Failed to update SEO settings." }, { status: 500 });
  }
}
