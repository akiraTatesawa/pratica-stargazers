import "../../config/config";
import pg from "pg";

const { Pool } = pg;

export const connection = new Pool({
  connectionString: process.env.PG_DATABASE_URL,
});
