import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST() {

  for (let i = 1; i <= 6; i++) {
    await pool.query(
      `INSERT INTO workers VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [`W${i}`, `Worker ${i}`]
    );

    await pool.query(
      `INSERT INTO workstations VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [`S${i}`, `Station ${i}`]
    );
  }

  return NextResponse.json({ message: "Seeded workers & stations" });
}