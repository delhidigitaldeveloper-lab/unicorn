import { NextRequest, NextResponse } from "next/server";
import { getAllTestimonials, createTestimonial } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const testimonials = await getAllTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testimonial = await createTestimonial(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error("Create testimonial error:", err);
    return NextResponse.json({ error: "Failed to create testimonial." }, { status: 500 });
  }
}
