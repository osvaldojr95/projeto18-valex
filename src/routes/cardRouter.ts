import { Router } from "express";
import {
    createCard,
    activateCard,
    blockCard,
    unlockCard,
    getBalance,
} from "../controllers/cardController.js";
import {
    createCardValidation,
    activateCardValidation,
    blockCardValidation,
    balanceValidation,
} from "../middlewares/cardValidation.js";

const cardRouter = Router();

cardRouter.post("/newcard", createCardValidation, createCard);
cardRouter.post("/activate/:id", activateCardValidation, activateCard);
cardRouter.post("/block/:id", blockCardValidation, blockCard);
cardRouter.post("/unlock/:id", blockCardValidation, unlockCard);
cardRouter.get("/balance/:id", balanceValidation, getBalance);

export default cardRouter;
