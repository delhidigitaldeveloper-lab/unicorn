import { NextRequest, NextResponse } from "next/server";
import { getAllTeamMembers, createTeamMember } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const team = await getAllTeamMembers();
  return NextResponse.json(team);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const member = await createTeamMember(body);
    return NextResponse.json(member, { status: 201 });
  } catch (err) {
    console.error("Create team member error:", err);
    return NextResponse.json({ error: "Failed to create team member." }, { status: 500 });
  }
}
