import { NextRequest, NextResponse } from "next/server";
import {
  getJointVentureById,
  updateJointVenture,
  deleteJointVenture,
} from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const venture = await getJointVentureById(params.id);
  if (!venture) return NextResponse.json({ error: "Joint venture not found." }, { status: 404 });
  return NextResponse.json(venture);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateJointVenture(params.id, body);
    if (!updated) return NextResponse.json({ error: "Joint venture not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update joint venture error:", err);
    return NextResponse.json({ error: "Failed to update joint venture." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteJointVenture(params.id);
  if (!deleted) return NextResponse.json({ error: "Joint venture not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
