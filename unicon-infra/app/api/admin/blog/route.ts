import { NextRequest, NextResponse } from "next/server";
import { getAllBlogPosts, createBlogPost } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAllBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createBlogPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("Create blog post error:", err);
    return NextResponse.json({ error: "Failed to create blog post." }, { status: 500 });
  }
}
