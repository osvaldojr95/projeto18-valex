import { Router } from "express";
import {
    createCard,
    activateCard,
    blockCard,
    unlockCard,
    rechargeCard,
    payment,
} from "../controllers/cardController.js";
import {
    createCardValidation,
    activateCardValidation,
    blockCardValidation,
} from "../middlewares/cardValidation.js";
import { rechargeCardValidation } from "../middlewares/rechargeValidation.js";
import { paymentValidation } from "../middlewares/paymentValidation.js";

const cardRouter = Router();

cardRouter.post("/newcard", createCardValidation, createCard);
cardRouter.post("/activate/:id", activateCardValidation, activateCard);
cardRouter.post("/block/:id", blockCardValidation, blockCard);
cardRouter.post("/unlock/:id", blockCardValidation, unlockCard);
cardRouter.post("/recharge/:id", rechargeCardValidation, rechargeCard);
cardRouter.post("/payment/:id", paymentValidation, payment);

export default cardRouter;
