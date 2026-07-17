import { NextRequest, NextResponse } from "next/server";
import { getFounder, updateFounder } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const founder = await getFounder();
  return NextResponse.json(founder);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await updateFounder(body);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update founder error:", err);
    return NextResponse.json({ error: "Failed to update founder profile." }, { status: 500 });
  }
}
