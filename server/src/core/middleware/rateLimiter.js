import rateLimit from 'express-rate-limit';

export const createRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 100, message } = {}) => {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        message: message || 'Too many requests, please try again later',
    });
};

export const authLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many auth attempts, please try again after 15 minutes',
});

export const apiLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
