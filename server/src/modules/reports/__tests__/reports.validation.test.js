import { switchStatusSchema } from '../reports.validation.js';

describe('Reports Validation', () => {
    describe('switchStatusSchema', () => {
        test('accepts Active status', () => {
            const { error } = switchStatusSchema.validate({ status: 'Active' });
            expect(error).toBeUndefined();
        });

        test('accepts Resolved status', () => {
            const { error } = switchStatusSchema.validate({ status: 'Resolved' });
            expect(error).toBeUndefined();
        });

        test('accepts Critical status', () => {
            const { error } = switchStatusSchema.validate({ status: 'Critical' });
            expect(error).toBeUndefined();
        });

        test('rejects invalid status', () => {
            const { error } = switchStatusSchema.validate({ status: 'invalid' });
            expect(error).toBeDefined();
        });

        test('requires status', () => {
            const { error } = switchStatusSchema.validate({});
            expect(error).toBeDefined();
        });
    });
});
