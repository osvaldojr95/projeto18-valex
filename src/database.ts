import pg from "pg";
import "./config.js";

const { Pool } = pg;
const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default connection;
