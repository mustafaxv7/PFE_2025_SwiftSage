import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

// The pg library does not support the 'channel_binding' parameter.
// Strip it from the DATABASE_URL to prevent SSL connection failures.
let connectionString = process.env.DATABASE_URL;

// Handle misconfiguration where the full URL is pasted into DB_HOST instead of DATABASE_URL
if (!connectionString) {
    const fallbackHost = process.env.DB_CONNECTION_HOST || process.env.DB_HOST;
    if (fallbackHost && fallbackHost.startsWith('postgres')) {
        connectionString = fallbackHost;
    }
}

if (connectionString) {
    // Remove channel_binding param (pg library does not support it)
    connectionString = connectionString.replace(/[?&]channel_binding=[^&]*/g, '');
    // Ensure sslmode stays as require for Neon
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

export default con;


