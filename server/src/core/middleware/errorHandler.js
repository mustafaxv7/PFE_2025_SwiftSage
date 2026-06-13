import { AppError } from '../errors/AppError.js';

export const errorHandler = (err, req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            code: err.code,
            message: err.message,
            ...(err.details && { details: err.details }),
        });
    }

    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_JSON',
            message: 'Invalid JSON in request body',
        });
    }

    console.error('[error]', err);
    res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
    });
};
