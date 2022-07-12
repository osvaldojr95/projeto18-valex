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
    if (validation.error) throw { type: "422" };

    res.locals.body = validation.value;
    next();
}
