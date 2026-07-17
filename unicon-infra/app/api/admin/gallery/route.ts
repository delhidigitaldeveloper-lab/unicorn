import { NextRequest, NextResponse } from "next/server";
import { getAllGalleryImages, createGalleryImage } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const images = await getAllGalleryImages();
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const image = await createGalleryImage(body);
    return NextResponse.json(image, { status: 201 });
  } catch (err) {
    console.error("Create gallery image error:", err);
    return NextResponse.json({ error: "Failed to add image." }, { status: 500 });
  }
}
