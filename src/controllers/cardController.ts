import { Request, Response } from "express";
import { findCompanyApiKey } from "../services/companyServices.js";
import {
    findBusinessById,
    verifyTypeBusiness,
} from "../services/businessServices.js";
import { findEmployeeById } from "../services/employeeServices.js";
import {
    insertCard,
    findCardById,
    verifyCardCVC,
    saveCardPassword,
    permissionActivateCard,
    permissionBlockCard,
    verifyCardPassword,
    updateBlockedCard,
    permissionUnlockCard,
    verifyBalanceCard,
} from "../services/cardServices.js";
import {
    permissionRechargeCard,
    updateRechargeCard,
} from "../services/rechargeServices.js";
import {
    permissionPayment,
    insertPayment,
} from "../services/paymentServices.js";

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
    await updateBlockedCard(card, true);
    res.sendStatus(200);
}

export async function unlockCard(req: Request, res: Response) {
    const { id, password } = res.locals.body;
    const card = await findCardById(id);
    await permissionUnlockCard(card);
    await verifyCardPassword(card, password);
    await updateBlockedCard(card, false);
    res.sendStatus(200);
}

export async function rechargeCard(req: Request, res: Response) {
    const { id, value, apiKey } = res.locals.body;
    await findCompanyApiKey(apiKey);
    const card = await findCardById(id);
    await permissionRechargeCard(card);
    await updateRechargeCard(card, value);
    res.sendStatus(200);
}

export async function payment(req: Request, res: Response) {
    const { id, idBusiness, password, value } = res.locals.body;
    const business = await findBusinessById(idBusiness);
    const card = await findCardById(id);
    await verifyTypeBusiness(business, card);
    await permissionPayment(card);
    await verifyCardPassword(card, password);
    await verifyBalanceCard(card, value);
    await insertPayment(card, idBusiness, value);
    res.sendStatus(200);
}
