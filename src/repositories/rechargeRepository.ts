import connection from "../database.js";
import {
    Recharge,
    RechargeInsertData,
} from "../Interfaces/rechargeRepository.js";

async function findByCardId(cardId: number) {
    const result = await connection.query<Recharge, [number]>(
        `SELECT * FROM recharges WHERE "cardId"=$1`,
        [cardId]
    );

    return result.rows;
}

async function insert(rechargeData: RechargeInsertData) {
    const { cardId, amount } = rechargeData;

    connection.query<any, [number, number]>(
        `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
        [cardId, amount]
    );
}

const rechargeRepository = {
    findByCardId,
    insert,
};

export default rechargeRepository;
