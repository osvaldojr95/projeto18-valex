import { Router } from "express";
import { rechargeCard } from "../controllers/cardController.js";
import { rechargeCardValidation } from "../middlewares/rechargeValidation.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:id", rechargeCardValidation, rechargeCard);

export default rechargeRouter;
