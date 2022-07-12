import dayjs from "dayjs";
import { Card } from "../Interfaces/cardInterface.js";
import { RechargeInsertData } from "../Interfaces/rechargeInterface.js";
import "../config.js";
import rechargeRepository from "../repositories/rechargeRepository.js";

export async function permissionRechargeCard(card: Card) {
    if (!card.password) throw { type: "unauthorized" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "unauthorized";
}

export async function updateRechargeCard(card: Card, value: number) {
    const recharge: RechargeInsertData = {
        cardId: card.id,
        amount: value,
    };

    await rechargeRepository.insert(recharge);
}
