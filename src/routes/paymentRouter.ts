import { Router } from "express";
import { payment } from "../controllers/cardController.js";
import { paymentValidation } from "../middlewares/paymentValidation.js";

const paymentRouter = Router();

paymentRouter.post("/payment/:id", paymentValidation, payment);

export default paymentRouter;
