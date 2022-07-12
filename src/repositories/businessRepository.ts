import connection from "../database.js";
import { TransactionTypes } from "../Interfaces/cardInterface.js";
import { Business } from "../Interfaces/businessInterface.js";

async function findById(id: number) {
    const result = await connection.query<Business, [number]>(
        "SELECT * FROM businesses WHERE id=$1",
        [id]
    );

    return result.rows[0];
}

const businessesRepository = {
    findById,
};

export default businessesRepository;
