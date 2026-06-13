import 'dotenv/config';
import pkg from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const pool = new Pool({
    ...poolConfig,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: true }
        : false,
});

pool.on('error', (err) => {
    console.error('[db] Unexpected error on idle database client', err);
});

async function initializeDatabase() {
    try {
        await pool.query('SELECT 1 FROM admins LIMIT 1');
    } catch (err) {
        if (err.code === '42P01') {
            console.log('[db] Tables missing. Running swiftsage_dump.sql...');
            try {
                const normalizedFilename = process.platform === 'win32' && __filename.startsWith('/')
                    ? __filename.substring(1)
                    : __filename;
                const configDir = path.dirname(normalizedFilename);
                let sqlPath = path.resolve(configDir, '../../../swiftsage_dump.sql');
                if (!fs.existsSync(sqlPath)) {
                    sqlPath = path.resolve(process.cwd(), 'swiftsage_dump.sql');
                }
                let sql = fs.readFileSync(sqlPath, 'utf-8');
                sql = sql.replace(/ALTER (TABLE|SEQUENCE|TYPE) .+ OWNER TO [a-zA-Z_0-9]+;/g, '');
                sql = sql.replace(/SELECT pg_catalog\.set_config\('search_path'.+;/g, '');
                await pool.query(sql);
                console.log('[db] Database initialized successfully from dump!');
            } catch (e) {
                console.error('[db] Failed to initialize database from dump:', e);
            }
        }
    }
}

export { pool as default, initializeDatabase };
