import { randomUUID } from 'crypto';

const isDev = process.env.NODE_ENV !== 'production';

const log = (level, message, meta = {}) => {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        requestId: meta.requestId || randomUUID().slice(0, 8),
        message,
        ...meta,
    };
    if (isDev) {
        const colors = { info: '\x1b[36m', warn: '\x1b[33m', error: '\x1b[31m', debug: '\x1b[90m' };
        const { requestId: _id, ...rest } = entry;
        console.log(
            `${colors[level] || ''}[${level.toUpperCase()}]\x1b[0m [${entry.requestId}] ${message}`,
            Object.keys(rest).length > 1 ? rest : ''
        );
    } else {
        console.log(JSON.stringify(entry));
    }
};

const logger = {
    info: (msg, meta) => log('info', msg, meta),
    warn: (msg, meta) => log('warn', msg, meta),
    error: (msg, meta) => log('error', msg, meta),
    debug: (msg, meta) => log('debug', msg, meta),
};

export default logger;
export { randomUUID };
