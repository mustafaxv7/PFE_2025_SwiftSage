import { AppError } from '../errors/AppError.js';
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, _next) => {
    const requestId = req.requestId || 'unknown';

    if (err instanceof AppError) {
        logger.warn(`${err.code}: ${err.message}`, { requestId, statusCode: err.statusCode });
        return res.status(err.statusCode).json({
            status: 'error',
            code: err.code,
            message: err.message,
            requestId,
            ...(err.details && { details: err.details }),
        });
    }

    if (err.type === 'entity.parse.failed') {
        logger.warn('Invalid JSON in request body', { requestId });
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_JSON',
            message: 'Invalid JSON in request body',
            requestId,
        });
    }

    logger.error('Unhandled error', {
        requestId,
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        requestId,
    });
};
