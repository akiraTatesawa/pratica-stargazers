import { Router } from "express";
import { validateBattle } from "../middlewares/battleMiddleware";

export const serverRouter = Router();

serverRouter.post("/battle", validateBattle);

serverRouter.get("/ranking");
