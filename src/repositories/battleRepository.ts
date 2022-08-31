import { Fighter } from "../@types";
import { connection } from "../databases/postgres/connection";

export async function getFighterByName(username: string) {
  const result = await connection.query<Fighter, [string]>(
    `SELECT * FROM fighters WHERE username = $1`,
    [username]
  );

  return result.rows[0];
}

export async function insertFighter(username: string) {
  await connection.query(
    `INSERT INTO fighters (username, wins, losses, draws)
    VALUES($1, 0, 0, 0)`,
    [username]
  );
}

export async function update(field: string, username: string) {
  if (field === "wins") {
    await connection.query(
      `UPDATE fighters SET wins = wins + 1 WHERE username = $1`,
      [username]
    );
  }

  if (field === "losses") {
    await connection.query(
      `UPDATE fighters SET losses = losses + 1 WHERE username = $1`,
      [username]
    );
  }

  if (field === "draws") {
    await connection.query(
      `UPDATE fighters SET draws = draws + 1 WHERE username = $1`,
      [username]
    );
  }
}
