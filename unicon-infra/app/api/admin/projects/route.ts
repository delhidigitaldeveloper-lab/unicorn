import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await createProject(body);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
