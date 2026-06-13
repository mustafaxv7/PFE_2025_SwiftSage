import { jest } from '@jest/globals';
import { errorHandler } from '../middleware/errorHandler.js';
import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ValidationError } from '../errors/ValidationError.js';

describe('Error Handler Middleware', () => {
    const mockReq = {};
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test('handles AppError correctly', () => {
        const err = new AppError('test error', 418, 'TEAPOT');
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(418);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            code: 'TEAPOT',
            message: 'test error',
        });
    });

    test('handles NotFoundError', () => {
        const err = new NotFoundError('Report');
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ code: 'NOT_FOUND' })
        );
    });

    test('handles ValidationError with details', () => {
        const details = [{ field: 'email', message: 'required' }];
        const err = new ValidationError(details);
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ details })
        );
    });

    test('handles JSON parse errors', () => {
        const err = new Error('Unexpected token');
        err.type = 'entity.parse.failed';
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ code: 'INVALID_JSON' })
        );
    });

    test('handles unknown errors with 500', () => {
        const err = new Error('something broke');
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({ code: 'INTERNAL_ERROR' })
        );
    });

    test('logs unknown errors', () => {
        const err = new Error('something broke');
        errorHandler(err, mockReq, mockRes, mockNext);

        expect(console.error).toHaveBeenCalledWith('[error]', err);
    });
});
