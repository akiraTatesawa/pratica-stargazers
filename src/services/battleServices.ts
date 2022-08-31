import axios from "axios";
import { CustomError } from "../classes/CustomError";
import * as BattleRepository from "../repositories/battleRepository";

interface GitHubRepos {
  stargazers_count: number;
}

export async function battleService(firstUser: string, secondUser: string) {
  if (firstUser === secondUser) {
    throw new CustomError(
      "error_bad_request",
      "First username cannot be the same as the Second username"
    );
  }

  const firstUserGithub = await axios.get(
    `https://api.github.com/users/${firstUser}/repos`
  );
  const secondUserGithub = await axios.get(
    `https://api.github.com/users/${secondUser}/repos`
  );
  if (!firstUserGithub.data[0] || !secondUserGithub.data[0]) {
    throw new CustomError("error_not_found", "User does not exist on GitHub");
  }

  const firstUserDatabase = await BattleRepository.getFighterByName(firstUser);
  if (!firstUserDatabase) {
    await BattleRepository.insertFighter(firstUser);
  }

  const secondUserDatabase = await BattleRepository.getFighterByName(
    secondUser
  );
  if (!secondUserDatabase) {
    await BattleRepository.insertFighter(secondUser);
  }

  let firstUserStarsCount = 0;
  let secondUserStarsCount = 0;

  firstUserGithub.data.forEach((repo: GitHubRepos) => {
    firstUserStarsCount += repo.stargazers_count;
  });
  secondUserGithub.data.forEach((repo: GitHubRepos) => {
    secondUserStarsCount += repo.stargazers_count;
  });

  if (firstUserStarsCount > secondUserStarsCount) {
    await BattleRepository.update("wins", firstUser);
    await BattleRepository.update("losses", secondUser);
    return { winner: firstUser, loser: secondUser, draw: false };
  }
  if (firstUserStarsCount < secondUserStarsCount) {
    await BattleRepository.update("wins", secondUser);
    await BattleRepository.update("losses", firstUser);
    return { winner: secondUser, loser: firstUser, draw: false };
  }

  await BattleRepository.update("draws", firstUser);
  await BattleRepository.update("draws", secondUser);
  return { winner: null, loser: null, draw: true };
}
