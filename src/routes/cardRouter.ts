import { Router } from "express";
import {
    createCard,
    activateCard,
    blockCard,
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

export default cardRouter;
