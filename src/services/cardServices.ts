// import { findByApiKey } from "../repositories/companyRepository.js";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import Employee from "../Interfaces/employeeInteface.js";
import cardRepository from "../repositories/cardRepository.js";
import {
    CardInsertData,
    TransactionTypes,
} from "../Interfaces/cardInterface.js";
import "../config.js";

export async function insertCard(type: TransactionTypes, employee: Employee) {
    const cardExist = await cardRepository.findByTypeAndEmployeeId(
        type,
        employee.id
    );
    if (cardExist) throw { type: "conflit" };

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
    if (!card) throw { type: "404" };
    return card;
}

export async function verifyCardCVC(card, cvc: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
    const cardCVC = cryptr.decrypt(card.securityCode);
    if (cvc !== cardCVC) throw { type: "401" };
}

export async function permissionActivateCard(card) {
    if (card.password) throw { type: "already activated" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "expired";
}

export async function permissionBlockCard(card) {
    if (card.isBlocked) throw { type: "already blocked" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "expired";
}

export async function verifyCardPassword(card, password: string) {
    if (!bcrypt.compareSync(password, card.password))
        throw { type: "Incorret Password" };
}

export async function saveCardPassword(card, password: string) {
    card.password = bcrypt.hashSync(password, +process.env.SALT);
    console.log(password);
    console.log(card.password);

    await cardRepository.update(card.id, card);
}

export async function updateBlockedCard(card, status: Boolean) {
    card.isBlocked = status;
    await cardRepository.update(card.id, card);
}

export async function permissionUnlockCard(card) {
    if (!card.isBlocked) throw { type: "already unlocked" };

    const validList = card.expirationDate.split("/");
    const validCard = dayjs(`${validList[0]}/01/${validList[1]}`);
    const today = dayjs(Date.now());

    if (validCard.diff(today) < 0) throw "expired";
}
