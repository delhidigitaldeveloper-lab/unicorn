import { NextResponse } from "next/server";
import { getAllSeoSettings } from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export async function GET() {
  const seo = await getAllSeoSettings();
  return NextResponse.json(seo);
}
