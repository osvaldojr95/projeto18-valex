import { Request, Response } from "express";
import { findCompanyApiKey } from "../services/companyServices.js";
import { findEmployeeById } from "../services/employeeServices.js";
import {
    insertCard,
    findCardById,
    verifyCardCVC,
    saveCardPassword,
    permissionActivateCard,
    permissionBlockCard,
    verifyCardPassword,
    updateBlockCard,
} from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
    const { id, type, apiKey } = res.locals.body;
    await findCompanyApiKey(apiKey);
    const employee = await findEmployeeById(id);
    await insertCard(type, employee);
    res.sendStatus(200);
}

export async function activateCard(req: Request, res: Response) {
    const { id, cvc, password } = res.locals.body;
    const card = await findCardById(id);
    await permissionActivateCard(card);
    await verifyCardCVC(card, cvc);
    await saveCardPassword(card, password);
    res.sendStatus(200);
}

export async function blockCard(req: Request, res: Response) {
    const { id, password } = res.locals.body;
    const card = await findCardById(id);
    await permissionBlockCard(card);
    await verifyCardPassword(card, password);
    await updateBlockCard(card);
    res.sendStatus(200);
}
