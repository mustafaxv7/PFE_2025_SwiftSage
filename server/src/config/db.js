import pkg from 'pg';
import dotenv from 'dotenv';
const { Client } = pkg;

dotenv.config();

const con = new Client({
    host: process.env.DB_CONNECTION_HOST, 
    user: "swiftsage_owner",
    port: 5432,
    password: process.env.DB_CONNECTION_PASSWORD,
    database: "swiftsage",
    ssl: { rejectUnauthorized: false } // Neon requires SSL
});

export default con;




