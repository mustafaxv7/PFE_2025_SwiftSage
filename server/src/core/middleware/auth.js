import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';

export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new UnauthorizedError('No token, authorization denied'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        next(new UnauthorizedError('Token is not valid'));
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new UnauthorizedError('No user session'));
    }
    if (req.user.role !== 'admin') {
        return next(new ForbiddenError('Access denied: Admin only'));
    }
    next();
};
