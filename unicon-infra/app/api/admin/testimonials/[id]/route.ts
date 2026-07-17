import { NextRequest, NextResponse } from "next/server";
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const testimonial = await getTestimonialById(params.id);
  if (!testimonial) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateTestimonial(params.id, body);
    if (!updated) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update testimonial error:", err);
    return NextResponse.json({ error: "Failed to update testimonial." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteTestimonial(params.id);
  if (!deleted) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
