import { NextRequest, NextResponse } from "next/server";
import { markSubmissionRead, deleteSubmission } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json().catch(() => ({}));
    const updated = await markSubmissionRead(params.id, body.read ?? true);
    if (!updated) return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update submission error:", err);
    return NextResponse.json({ error: "Failed to update submission." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteSubmission(params.id);
  if (!deleted) return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
