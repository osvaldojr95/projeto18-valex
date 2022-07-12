import { Errback, Request, Response, NextFunction } from "express";

export default async function handlerError(
    error: Errback,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("Error: ", error);
    return res.sendStatus(500);
}
