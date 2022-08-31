import { connection } from "../databases/postgres/connection";

export async function getRanking() {
  const result = await connection.query(`
  SELECT fighters.username, fighters.wins, fighters.losses, fighters.draws FROM fighters ORDER BY wins DESC, draws DESC
  `);

  return result.rows;
}
