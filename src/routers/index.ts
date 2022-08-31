import { Router } from "express";
import { battleController } from "../controllers/battleControllers";
import { validateBattle } from "../middlewares/battleMiddleware";

export const serverRouter = Router();

serverRouter.post("/battle", validateBattle, battleController);

serverRouter.get("/ranking");
