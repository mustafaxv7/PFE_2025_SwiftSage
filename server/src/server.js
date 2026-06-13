import './core/config/env.js';
import { createApp } from './app.js';
import { initializeDatabase, closePool } from './core/config/database.js';
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
            process.exit(1);
        } else {
            throw err;
        }
    });

    const shutdown = async (signal) => {
        logger.info(`${signal} received. Shutting down gracefully...`);
        server.close(async () => {
            await closePool();
            logger.info('Server shut down.');
            process.exit(0);
        });
        setTimeout(() => {
            logger.error('Forced shutdown after timeout');
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
        logger.error('Unhandled rejection', { error: String(reason) });
    });
    process.on('uncaughtException', (err) => {
        logger.error('Uncaught exception', { error: err.message, stack: err.stack });
        process.exit(1);
    });
}

start();
