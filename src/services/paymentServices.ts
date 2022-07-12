import { Card } from "../Interfaces/cardInterface.js";
import dayjs from "dayjs";
import { PaymentInsertData } from "../Interfaces/paymentInterface.js";
import "../config.js";
import paymentRepository from "../repositories/paymentRepository.js";

export async function permissionPayment(card: Card) {
    if (!card.password) throw { type: "Card not activated" };
    if (card.isBlocked) throw { type: "Card blocked" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "expired";
}

export async function insertPayment(
    card: Card,
    idBusiness: number,
    value: number
) {
    const payment: PaymentInsertData = {
        businessId: idBusiness,
        cardId: card.id,
        amount: value,
    };
    await paymentRepository.insert(payment);
}
