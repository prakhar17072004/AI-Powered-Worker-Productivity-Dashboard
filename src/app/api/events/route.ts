import { NextRequest, NextResponse } from "next/server";
import { getMetrics } from "@/lib/metris";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);

  const start = searchParams.get("start") || "2026-01-01";
  const end = searchParams.get("end") || "2026-12-31";

  const data = await getMetrics(start, end);

  return NextResponse.json(data);
}