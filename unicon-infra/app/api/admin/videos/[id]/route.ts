import { NextRequest, NextResponse } from "next/server";
import { getVideoById, updateVideo, deleteVideo } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const video = await getVideoById(params.id);
  if (!video) return NextResponse.json({ error: "Video not found." }, { status: 404 });
  return NextResponse.json(video);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateVideo(params.id, body);
    if (!updated) return NextResponse.json({ error: "Video not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update video error:", err);
    return NextResponse.json({ error: "Failed to update video." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteVideo(params.id);
  if (!deleted) return NextResponse.json({ error: "Video not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
