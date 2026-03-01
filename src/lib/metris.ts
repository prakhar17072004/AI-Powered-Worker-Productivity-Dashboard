import { pool } from "./db";

export async function getMetrics(start: string, end: string) {

  const result = await pool.query(`
    WITH ordered_events AS (
      SELECT *,
        LEAD(timestamp) OVER (
          PARTITION BY worker_id ORDER BY timestamp
        ) AS next_time
      FROM events
      WHERE timestamp BETWEEN $1 AND $2
    ),
    durations AS (
      SELECT worker_id,
             workstation_id,
             event_type,
             EXTRACT(EPOCH FROM (next_time - timestamp)) AS duration,
             count
      FROM ordered_events
      WHERE next_time IS NOT NULL
    )
    SELECT worker_id,
      SUM(CASE WHEN event_type='working' THEN duration ELSE 0 END) AS active_time,
      SUM(CASE WHEN event_type='idle' THEN duration ELSE 0 END) AS idle_time,
      SUM(CASE WHEN event_type='product_count' THEN count ELSE 0 END) AS total_units
    FROM durations
    GROUP BY worker_id;
  `, [start, end]);

  return result.rows;
}