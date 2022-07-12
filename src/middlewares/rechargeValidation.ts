import { Request, Response, NextFunction } from "express";
import rechargeCard from "../schemas/rechargeCardSchema.js";

export function rechargeCardValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    const { value } = req.body;
    const apiKey = req.header("x-api-key");

    const validation = rechargeCard.validate(
        { id: +id, value, apiKey },
        { abortEarly: false }
    );
    if (validation.error) throw { type: "422" };

    res.locals.body = validation.value;
    next();
}
