import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/db/repositories";
import { SubmissionType } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID_TYPES: SubmissionType[] = ["contact", "site-visit", "brochure"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, phone, email, project, message } = body;

    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid submission type." }, { status: 400 });
    }
    if (!email || (!name && type !== "brochure")) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const submission = await createSubmission({
      type,
      name: name || "Brochure Request",
      phone: phone || "",
      email,
      project: project || undefined,
      message: message || undefined,
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error("Contact submission error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
