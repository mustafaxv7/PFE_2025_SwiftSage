import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';
import { ValidationError } from '../errors/ValidationError.js';

describe('Error Classes', () => {
    test('AppError has correct defaults', () => {
        const err = new AppError('test');
        expect(err.message).toBe('test');
        expect(err.statusCode).toBe(500);
        expect(err.code).toBe('INTERNAL_ERROR');
        expect(err.isOperational).toBe(true);
        expect(err.name).toBe('AppError');
    });

    test('AppError accepts custom statusCode and code', () => {
        const err = new AppError('fail', 418, 'TEAPOT');
        expect(err.statusCode).toBe(418);
        expect(err.code).toBe('TEAPOT');
    });

    test('NotFoundError has 404', () => {
        const err = new NotFoundError('User');
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe('User not found');
        expect(err.code).toBe('NOT_FOUND');
    });

    test('NotFoundError default resource', () => {
        const err = new NotFoundError();
        expect(err.message).toBe('Resource not found');
    });

    test('UnauthorizedError has 401', () => {
        const err = new UnauthorizedError();
        expect(err.statusCode).toBe(401);
        expect(err.code).toBe('UNAUTHORIZED');
    });

    test('ForbiddenError has 403', () => {
        const err = new ForbiddenError();
        expect(err.statusCode).toBe(403);
        expect(err.code).toBe('FORBIDDEN');
    });

    test('ValidationError stores details', () => {
        const details = [{ field: 'email', message: 'required' }];
        const err = new ValidationError(details);
        expect(err.statusCode).toBe(400);
        expect(err.details).toEqual(details);
        expect(err.code).toBe('VALIDATION_ERROR');
    });

    test('all errors are instances of AppError', () => {
        expect(new NotFoundError()).toBeInstanceOf(AppError);
        expect(new UnauthorizedError()).toBeInstanceOf(AppError);
        expect(new ForbiddenError()).toBeInstanceOf(AppError);
        expect(new ValidationError([])).toBeInstanceOf(AppError);
    });

    test('all errors are Error instances', () => {
        expect(new AppError('x')).toBeInstanceOf(Error);
        expect(new NotFoundError()).toBeInstanceOf(Error);
    });
});
