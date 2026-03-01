import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  user: "postgres",
  password: "postgres",
  database: "factory",
  port: 5432,
});