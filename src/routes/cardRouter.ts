import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardController.js";
import { createCardValidation, activateCardValidation } from "../middlewares/cardValidation.js";

const cardRouter = Router();

cardRouter.post("/newcard", createCardValidation, createCard);
cardRouter.post("/activate/:id", activateCardValidation, activateCard);

export default cardRouter;
