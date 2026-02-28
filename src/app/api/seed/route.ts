import  pool  from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workers (
      id VARCHAR PRIMARY KEY,
      name VARCHAR
    );

    CREATE TABLE IF NOT EXISTS workstations (
      id VARCHAR PRIMARY KEY,
      name VARCHAR
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP,
      worker_id VARCHAR REFERENCES workers(id),
      workstation_id VARCHAR REFERENCES workstations(id),
      event_type VARCHAR,
      confidence FLOAT,
      count INT DEFAULT 0,
      UNIQUE(timestamp, worker_id, workstation_id, event_type)
    );
  `);

  for (let i = 1; i <= 6; i++) {
    await pool.query(`INSERT INTO workers VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [`W${i}`, `Worker ${i}`]);

    await pool.query(`INSERT INTO workstations VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [`S${i}`, `Station ${i}`]);
  }

  return NextResponse.json({ message: "Seeded" });
}