import { NextRequest, NextResponse } from "next/server";
import { getGalleryImageById, updateGalleryImage, deleteGalleryImage } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const image = await getGalleryImageById(params.id);
  if (!image) return NextResponse.json({ error: "Image not found." }, { status: 404 });
  return NextResponse.json(image);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateGalleryImage(params.id, body);
    if (!updated) return NextResponse.json({ error: "Image not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update gallery image error:", err);
    return NextResponse.json({ error: "Failed to update image." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteGalleryImage(params.id);
  if (!deleted) return NextResponse.json({ error: "Image not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
