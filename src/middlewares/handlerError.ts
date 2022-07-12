import { Request, Response, NextFunction } from "express";

export default async function handlerError(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("Error: ", error);

    if (error.type === "unprocessableEntity") return res.sendStatus(422);
    if (error.type === "notFound") return res.sendStatus(404);
    if (error.type === "conflict") return res.sendStatus(409);
    if (error.type === "unauthorized") return res.sendStatus(401);

    return res.sendStatus(500);
}
