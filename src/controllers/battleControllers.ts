import { Request, Response } from "express";
import * as BattleServices from "../services/battleServices";

export async function battleController(
  req: Request<{}, {}, { firstUser: string; secondUser: string }>,
  res: Response
) {
  const { firstUser, secondUser } = req.body;

  const result = await BattleServices.battleService(firstUser, secondUser);
  return res.json(result);
}
