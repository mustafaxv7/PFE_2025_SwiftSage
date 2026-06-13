import { registerSchema, loginSchema } from '../auth.validation.js';

describe('Auth Validation', () => {
    describe('registerSchema', () => {
        const validUser = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '0555123456',
            password: 'securePass123',
            community: 'Chlef',
        };

        test('accepts valid registration data', () => {
            const { error } = registerSchema.validate(validUser);
            expect(error).toBeUndefined();
        });

        test('requires name', () => {
            const { error } = registerSchema.validate({ ...validUser, name: undefined });
            expect(error).toBeDefined();
            expect(error.details[0].path).toContain('name');
        });

        test('rejects short name', () => {
            const { error } = registerSchema.validate({ ...validUser, name: 'ab' });
            expect(error).toBeDefined();
        });

        test('requires valid email', () => {
            const { error } = registerSchema.validate({ ...validUser, email: 'notemail' });
            expect(error).toBeDefined();
            expect(error.details[0].path).toContain('email');
        });

        test('requires phone', () => {
            const { error } = registerSchema.validate({ ...validUser, phone: undefined });
            expect(error).toBeDefined();
        });

        test('rejects short password', () => {
            const { error } = registerSchema.validate({ ...validUser, password: 'short' });
            expect(error).toBeDefined();
        });

        test('requires community', () => {
            const { error } = registerSchema.validate({ ...validUser, community: undefined });
            expect(error).toBeDefined();
        });

        test('accepts isOrganisationMember boolean', () => {
            const { error } = registerSchema.validate({ ...validUser, isOrganisationMember: true });
            expect(error).toBeUndefined();
        });

        test('accepts optional type field', () => {
            const { error } = registerSchema.validate({ ...validUser, type: 'public' });
            expect(error).toBeUndefined();
        });

        test('rejects invalid type', () => {
            const { error } = registerSchema.validate({ ...validUser, type: 'invalid' });
            expect(error).toBeDefined();
        });
    });

    describe('loginSchema', () => {
        test('accepts valid login', () => {
            const { error } = loginSchema.validate({ email: 'a@b.com', password: 'pass' });
            expect(error).toBeUndefined();
        });

        test('requires email', () => {
            const { error } = loginSchema.validate({ password: 'pass' });
            expect(error).toBeDefined();
        });

        test('requires password', () => {
            const { error } = loginSchema.validate({ email: 'a@b.com' });
            expect(error).toBeDefined();
        });

        test('accepts rememberMe', () => {
            const { error } = loginSchema.validate({
                email: 'a@b.com',
                password: 'pass',
                rememberMe: true,
            });
            expect(error).toBeUndefined();
        });
    });
});
