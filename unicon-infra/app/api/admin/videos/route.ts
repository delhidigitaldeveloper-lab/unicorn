import { NextRequest, NextResponse } from "next/server";
import { getAllVideos, createVideo } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const videos = await getAllVideos();
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const video = await createVideo(body);
    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    console.error("Create video error:", err);
    return NextResponse.json({ error: "Failed to add video." }, { status: 500 });
  }
}
