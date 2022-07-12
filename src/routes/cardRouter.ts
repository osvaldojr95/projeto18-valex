import { Router } from "express";
import {
    createCard,
    activateCard,
    blockCard,
    unlockCard,
    rechargeCard,
} from "../controllers/cardController.js";
import {
    createCardValidation,
    activateCardValidation,
    blockCardValidation,
    rechargeCardValidation,
} from "../middlewares/cardValidation.js";

const cardRouter = Router();

cardRouter.post("/newcard", createCardValidation, createCard);
cardRouter.post("/activate/:id", activateCardValidation, activateCard);
cardRouter.post("/block/:id", blockCardValidation, blockCard);
cardRouter.post("/unlock/:id", blockCardValidation, unlockCard);
cardRouter.post("/recharge/:id", rechargeCardValidation, rechargeCard);

export default cardRouter;
