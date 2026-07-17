import { NextRequest, NextResponse } from "next/server";
import { getTeamMemberById, updateTeamMember, deleteTeamMember } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const member = await getTeamMemberById(params.id);
  if (!member) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateTeamMember(params.id, body);
    if (!updated) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update team member error:", err);
    return NextResponse.json({ error: "Failed to update team member." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteTeamMember(params.id);
  if (!deleted) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
