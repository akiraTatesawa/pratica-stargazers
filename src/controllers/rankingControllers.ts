import { Request, Response } from "express";
import * as RankingServices from "../services/rankingServices";

export async function getRanking(req: Request, res: Response) {
  const ranking = await RankingServices.getRanking();

  return res.send(ranking);
}
