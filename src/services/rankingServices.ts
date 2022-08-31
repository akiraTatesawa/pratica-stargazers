import * as RankingRepository from "../repositories/rankingRepository";

export async function getRanking() {
  const ranking = await RankingRepository.getRanking();

  return { fighters: ranking };
}
