import './core/config/env.js';
import { createApp } from './app.js';
import { initializeDatabase } from './core/config/database.js';
import logger from './core/utils/logger.js';

const PORT = process.env.PORT || 5030;

async function start() {
    logger.info('Initializing database...');
    await initializeDatabase();

    const app = createApp();

    const server = app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            logger.error(`Port ${PORT} is already in use.`);
            logger.error(`Run: npx kill-port ${PORT}`);
            process.exit(1);
        } else {
            throw err;
        }
    });
}

start();
