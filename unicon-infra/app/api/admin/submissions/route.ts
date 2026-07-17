import { NextResponse } from "next/server";
import { getAllSubmissions } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const submissions = await getAllSubmissions();
  return NextResponse.json(submissions);
}
