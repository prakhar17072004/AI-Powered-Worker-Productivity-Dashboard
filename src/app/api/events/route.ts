import { NextRequest, NextResponse } from "next/server";
import  pool  from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { timestamp, worker_id, workstation_id, event_type, confidence, count } = body;

  await pool.query(`
    INSERT INTO events (timestamp, worker_id, workstation_id, event_type, confidence, count)
    VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT DO NOTHING
  `, [timestamp, worker_id, workstation_id, event_type, confidence, count]);

  return NextResponse.json({ message: "Event stored" });
}