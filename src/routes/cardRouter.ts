import { Router } from "express";
import {
    createCard,
    activateCard,
    blockCard,
    unlockCard,
} from "../controllers/cardController.js";
import {
    createCardValidation,
    activateCardValidation,
    blockCardValidation,
} from "../middlewares/cardValidation.js";

const cardRouter = Router();

cardRouter.post("/newcard", createCardValidation, createCard);
cardRouter.post("/activate/:id", activateCardValidation, activateCard);
cardRouter.post("/block/:id", blockCardValidation, blockCard);
cardRouter.post("/unlock/:id", blockCardValidation, unlockCard);

export default cardRouter;
