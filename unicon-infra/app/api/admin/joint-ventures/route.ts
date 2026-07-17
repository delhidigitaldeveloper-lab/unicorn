import { NextRequest, NextResponse } from "next/server";
import { getAllJointVentures, createJointVenture } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const ventures = await getAllJointVentures();
  return NextResponse.json(ventures);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const venture = await createJointVenture(body);
    return NextResponse.json(venture, { status: 201 });
  } catch (err) {
    console.error("Create joint venture error:", err);
    return NextResponse.json({ error: "Failed to create joint venture." }, { status: 500 });
  }
}
