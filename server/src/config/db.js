import 'dotenv/config';
import pkg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pkg;

let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    const fallbackHost = process.env.DB_CONNECTION_HOST || process.env.DB_HOST;
    if (fallbackHost && fallbackHost.startsWith('postgres')) {
        connectionString = fallbackHost;
    }
}

if (connectionString) {
    connectionString = connectionString.replace(/[?&]channel_binding=[^&]*/g, '');
}

const poolConfig = connectionString
    ? { connectionString }
    : {
        user: process.env.DB_USER || 'swiftsage_owner',
        host: process.env.DB_CONNECTION_HOST || process.env.DB_HOST,
        database: process.env.DB_NAME || 'swiftsage',
        password: process.env.DB_CONNECTION_PASSWORD || process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
    };

const con = new Pool({
    ...poolConfig,
    ssl: { rejectUnauthorized: false }
});

con.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
});

con.query("SELECT 1 FROM admins LIMIT 1").catch(async (err) => {
    if (err.code === '42P01') { 
        console.log('Database tables missing (brand new DB). Running swiftsage_dump.sql...');
        try {
            const sqlPath = path.resolve(process.cwd(), 'swiftsage_dump.sql');
            let sql = fs.readFileSync(sqlPath, 'utf-8');
            
            sql = sql.replace(/ALTER (TABLE|SEQUENCE|TYPE) .+ OWNER TO [a-zA-Z_0-9]+;/g, '');
            sql = sql.replace(/SELECT pg_catalog\.set_config\('search_path'.+;/g, '');

            await con.query(sql);
            console.log('? Database initialized successfully from dump!');
        } catch (e) {
            console.error('? Failed to initialize database from dump:', e);
        }
    }
});

export default con;
