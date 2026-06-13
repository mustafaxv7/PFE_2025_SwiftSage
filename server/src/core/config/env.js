import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '../../../../.env');
import('dotenv').then((dotenv) => {
    dotenv.config({ path: envPath });
});

const required = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];

const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(`\n[env] FATAL: Missing required environment variables:`);
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error(`\nSet these in your .env file. See .env.example for documentation.\n`);
    process.exit(1);
}

if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('\n[env] FATAL: JWT_SECRET must be at least 32 characters.');
    console.error('Generate a secure one with:');
    console.error('  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"\n');
    process.exit(1);
}

if (process.env.JWT_REFRESH_SECRET && process.env.JWT_REFRESH_SECRET.length < 32) {
    console.error('\n[env] FATAL: JWT_REFRESH_SECRET must be at least 32 characters.');
    console.error('Generate a secure one with:');
    console.error('  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"\n');
    process.exit(1);
}

const env = {
    PORT: parseInt(process.env.PORT, 10) || 5030,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    SPACES_ENDPOINT: process.env.SPACES_ENDPOINT || '',
    DO_SPACES_BUCKET: process.env.DO_SPACES_BUCKET || '',
    DO_SPACES_REGION: process.env.DO_SPACES_REGION || '',
    DO_SPACES_KEY: process.env.DO_SPACES_KEY || '',
    DO_SPACES_SECRET: process.env.DO_SPACES_SECRET || '',
    VITE_GOOGLE_MAPS_API_KEY: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
    VITE_MAP_ID: process.env.VITE_MAP_ID || '',
};

console.log(`[env] Loaded (NODE_ENV=${env.NODE_ENV}, PORT=${env.PORT})`);

export default env;
