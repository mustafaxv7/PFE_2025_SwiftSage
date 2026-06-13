import { randomUUID } from 'crypto';

export const requestId = (req, _res, next) => {
    req.requestId = req.headers['x-request-id'] || randomUUID().slice(0, 8);
    next();
};
