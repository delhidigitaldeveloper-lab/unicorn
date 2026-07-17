import { NextRequest, NextResponse } from "next/server";
import { getBlogById, updateBlogPost, deleteBlogPost } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const post = await getBlogById(params.id);
  if (!post) return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateBlogPost(params.id, body);
    if (!updated) return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update blog post error:", err);
    return NextResponse.json({ error: "Failed to update blog post." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteBlogPost(params.id);
  if (!deleted) return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
