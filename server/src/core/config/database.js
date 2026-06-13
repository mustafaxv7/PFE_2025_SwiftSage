import 'dotenv/config';
import pkg from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

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
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    logger.error('Unexpected error on idle database client', { error: err.message });
});

const INDEXES = [
    'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)',
    'CREATE INDEX IF NOT EXISTS idx_users_community ON users(community)',
    'CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC)',
    'CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id)',
    'CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status)',
    'CREATE INDEX IF NOT EXISTS idx_reports_crisis_type ON reports(crisis_type)',
    'CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC)',
    'CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status)',
    'CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC)',
    'CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(type)',
    'CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id)',
    'CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC)',
    'CREATE INDEX IF NOT EXISTS idx_categories_report_id ON categories(report_id)',
    'CREATE INDEX IF NOT EXISTS idx_report_details_report_id ON report_details(report_id)',
    'CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email)',
];

async function initializeDatabase() {
    try {
        await pool.query('SELECT 1 FROM admins LIMIT 1');
    } catch (err) {
        if (err.code === '42P01') {
            logger.info('Tables missing. Running swiftsage_dump.sql...');
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
                logger.info('Database initialized successfully from dump!');
            } catch (e) {
                logger.error('Failed to initialize database from dump', { error: e.message });
            }
        }
    }

    for (const idx of INDEXES) {
        try {
            await pool.query(idx);
        } catch (_e) { /* index may already exist */ }
    }
    logger.info('Database indexes ensured');
}

async function closePool() {
    await pool.end();
    logger.info('Database pool closed');
}

export { pool as default, initializeDatabase, closePool };
