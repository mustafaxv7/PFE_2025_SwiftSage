import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

const con = new Pool({
    host: process.env.DB_CONNECTION_HOST, 
    user: "swiftsage_owner",
    port: 5432,
    password: process.env.DB_CONNECTION_PASSWORD,
    database: "swiftsage",
    ssl: { rejectUnauthorized: false } 
});

export default con;




