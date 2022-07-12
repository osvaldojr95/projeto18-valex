import { Business } from "../Interfaces/businessInterface.js";
import { Card } from "../Interfaces/cardInterface.js";
import businessesRepository from "../repositories/businessRepository.js";

export async function findBusinessById(id: number) {
    const business = await businessesRepository.findById(id);
    if (!business) throw { type: "notFound " };

    return business;
}

export async function verifyTypeBusiness(business: Business, card: Card) {
    if (business.type !== card.type) throw { type: "unauthorized" };
}
