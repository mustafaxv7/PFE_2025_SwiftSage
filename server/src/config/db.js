import pkg from 'pg';
import dotenv from 'dotenv';
const { Client } = pkg;

dotenv.config();

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.DB_CONNECTION_PASSWORD,
    database: "swiftsage"
});

export default con;




