import  pool  from "./db";
import { redis } from "./radis";

export async function getFactoryMetrics(start: string, end: string) {
  const cacheKey = `metrics:${start}:${end}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const result = await pool.query(`
    SELECT worker_id,
           SUM(CASE WHEN event_type='product_count' THEN count ELSE 0 END) AS total_units,
           COUNT(*) FILTER (WHERE event_type='working') AS working_events,
           COUNT(*) FILTER (WHERE event_type='idle') AS idle_events
    FROM events
    WHERE timestamp BETWEEN $1 AND $2
    GROUP BY worker_id
  `, [start, end]);

  await redis.set(cacheKey, JSON.stringify(result.rows), { EX: 60 });

  return result.rows;
}