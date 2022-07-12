import { Request, Response, NextFunction } from "express";
import payment from "../schemas/paymentSchema.js";

export function paymentValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    const { idBusiness, password, value } = req.body;

    const validation = payment.validate(
        { id: +id, idBusiness, password, value },
        { abortEarly: false }
    );
    if (validation.error) throw { type: "unprocessableEntity" };

    res.locals.body = validation.value;
    next();
}
