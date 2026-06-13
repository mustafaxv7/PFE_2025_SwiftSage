import { jest } from '@jest/globals';
import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ValidationError } from '../errors/ValidationError.js';

jest.unstable_mockModule('../utils/logger.js', () => ({
    default: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

const { errorHandler } = await import('../middleware/errorHandler.js');
const { default: logger } = await import('../utils/logger.js');

describe('Error Handler Middleware', () => {
    const mockReq = { requestId: 'test-123' };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    const mockNext = jest.fn();

    beforeEach(() => { jest.clearAllMocks(); });

    test('handles AppError correctly', () => {
        errorHandler(new AppError('test', 418, 'TEAPOT'), mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(418);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'TEAPOT', requestId: 'test-123' }));
    });

    test('handles NotFoundError', () => {
        errorHandler(new NotFoundError('Report'), mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'NOT_FOUND' }));
    });

    test('handles ValidationError with details', () => {
        const details = [{ field: 'email', message: 'required' }];
        errorHandler(new ValidationError(details), mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ details }));
    });

    test('handles JSON parse errors', () => {
        const err = new Error('token');
        err.type = 'entity.parse.failed';
        errorHandler(err, mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'INVALID_JSON' }));
    });

    test('handles unknown errors with 500', () => {
        errorHandler(new Error('broke'), mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ code: 'INTERNAL_ERROR' }));
    });

    test('logs unknown errors via structured logger', () => {
        errorHandler(new Error('broke'), mockReq, mockRes, mockNext);
        expect(logger.error).toHaveBeenCalledWith('Unhandled error', expect.objectContaining({ requestId: 'test-123' }));
    });

    test('logs AppError as warning', () => {
        errorHandler(new AppError('no', 403, 'FORBIDDEN'), mockReq, mockRes, mockNext);
        expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('FORBIDDEN'), expect.objectContaining({ requestId: 'test-123' }));
    });
});
