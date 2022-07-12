import { Request, Response, NextFunction } from "express";
import createCard from "../schemas/createCardSchema.js";
import activateCard from "../schemas/activateCardSchema.js";
import blockCard from "../schemas/blockCardSchema.js";

export function createCardValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id, type } = req.body;
    const apiKey = req.header("x-api-key");

    const validation = createCard.validate(
        { id, type, apiKey },
        { abortEarly: false }
    );
    if (validation.error) throw { type: "422" };

    res.locals.body = validation.value;
    next();
}

export function activateCardValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    const { cvc, password } = req.body;

    const validation = activateCard.validate(
        { id: +id, cvc, password },
        { abortEarly: false }
    );
    if (validation.error) throw { type: "422" };

    res.locals.body = validation.value;
    next();
}

export function blockCardValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    const { password } = req.body;

    const validation = blockCard.validate(
        { id: +id, password },
        { abortEarly: false }
    );
    if (validation.error) throw { type: "422" };

    res.locals.body = validation.value;
    next();
}