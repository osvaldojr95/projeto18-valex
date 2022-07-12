// import { findByApiKey } from "../repositories/companyRepository.js";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import Employee from "../Interfaces/employeeInteface.js";
import cardRepository from "../repositories/cardRepository.js";
import {
    Card,
    CardInsertData,
    TransactionTypes,
} from "../Interfaces/cardInterface.js";
import paymentRepository from "../repositories/paymentRepository.js";
import rechargeRepository from "../repositories/rechargeRepository.js";

export async function insertCard(type: TransactionTypes, employee: Employee) {
    const cardExist = await cardRepository.findByTypeAndEmployeeId(
        type,
        employee.id
    );
    if (cardExist) throw { type: "conflict" };

    const nameList = employee.fullName.toUpperCase().split(" ");
    let cardName = "";
    if (nameList.length > 2) {
        let midNameList = nameList
            .splice(1, nameList.length - 2)
            .filter((item) => {
                if (item.length > 2) return true;
            })
            .map((item) => {
                return item[0];
            });

        cardName = `${nameList[0]} ${midNameList.join(" ")} ${nameList[1]}`;
    } else {
        cardName = nameList.join(" ");
    }

    let numberGen = faker.random
        .numeric(16, { allowLeadingZeros: false })
        .toString();
    const number = `${numberGen.substring(0, 4)} ${numberGen.substring(
        4,
        8
    )} ${numberGen.substring(8, 12)} ${numberGen.substring(12, 16)}`;

    const day = dayjs(Date.now()).add(5, "year").format("MM/YY");

    const cvcGen = faker.random
        .numeric(3, { allowLeadingZeros: true })
        .toString();

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
    const cvcCrypt = cryptr.encrypt(cvcGen);

    const newCard: CardInsertData = {
        employeeId: employee.id,
        number,
        cardholderName: cardName,
        securityCode: cvcCrypt,
        expirationDate: day,
        isVirtual: false,
        isBlocked: false,
        type: type,
    };

    await cardRepository.insert(newCard);
}

export async function findCardById(id: number) {
    const card = await cardRepository.findById(id);
    if (!card) throw { type: "notFound" };
    return card;
}

export async function verifyCardCVC(card: Card, cvc: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
    const cardCVC = cryptr.decrypt(card.securityCode);
    if (cvc !== cardCVC) throw { type: "unauthorized" };
}

export async function permissionActivateCard(card: Card) {
    if (card.password) throw { type: "unauthorized" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "unauthorized";
}

export async function permissionBlockCard(card: Card) {
    if (card.isBlocked) throw { type: "unauthorized" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "unauthorized";
}

export async function verifyCardPassword(card: Card, password: string) {
    if (!bcrypt.compareSync(password, card.password))
        throw { type: "unauthorized" };
}

export async function saveCardPassword(card: Card, password: string) {
    card.password = bcrypt.hashSync(password, +process.env.SALT);
    console.log(password);
    console.log(card.password);

    await cardRepository.update(card.id, card);
}

export async function updateBlockedCard(card: Card, status: boolean) {
    card.isBlocked = status;
    await cardRepository.update(card.id, card);
}

export async function permissionUnlockCard(card: Card) {
    if (!card.isBlocked) throw { type: "unauthorized" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "unauthorized";
}

export async function getBalanceTransactionCard(card: Card) {
    const payments = await paymentRepository.findByCardId(card.id);
    const recharges = await rechargeRepository.findByCardId(card.id);

    let total = 0;

    payments.forEach((item) => {
        total -= item.amount;
    });
    recharges.forEach((item) => {
        total += item.amount;
    });

    return {
        balance: total,
        transactions: payments,
        recharges: recharges,
    };
}

export async function verifyBalanceCard(card: Card, value) {
    const balance = await getBalanceTransactionCard(card);
    if (balance.balance < value) throw { type: "unauthorized" };
}
