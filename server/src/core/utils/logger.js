const isDev = process.env.NODE_ENV !== 'production';

const log = (level, message, meta = {}) => {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta,
    };
    if (isDev) {
        const colors = { info: '\x1b[36m', warn: '\x1b[33m', error: '\x1b[31m', debug: '\x1b[90m' };
        console.log(`${colors[level] || ''}[${level.toUpperCase()}]\x1b[0m ${message}`, Object.keys(meta).length ? meta : '');
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
