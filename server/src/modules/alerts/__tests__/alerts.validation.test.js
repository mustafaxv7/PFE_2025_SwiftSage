import { sendAlertSchema } from '../alerts.validation.js';

describe('Alerts Validation', () => {
    describe('sendAlertSchema', () => {
        const validAlert = {
            message: 'Flood warning',
            type: 'warning',
            location: 'Chlef',
            affectedArea: '5 km²',
        };

        test('accepts valid alert data', () => {
            const { error } = sendAlertSchema.validate(validAlert);
            expect(error).toBeUndefined();
        });

        test('requires message', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, message: '' });
            expect(error).toBeDefined();
        });

        test('requires type', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, type: undefined });
            expect(error).toBeDefined();
        });

        test('accepts info type', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, type: 'info' });
            expect(error).toBeUndefined();
        });

        test('accepts danger type', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, type: 'danger' });
            expect(error).toBeUndefined();
        });

        test('rejects invalid type', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, type: 'invalid' });
            expect(error).toBeDefined();
        });

        test('requires location', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, location: '' });
            expect(error).toBeDefined();
        });

        test('requires affectedArea', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, affectedArea: '' });
            expect(error).toBeDefined();
        });

        test('accepts optional fields', () => {
            const { error } = sendAlertSchema.validate({
                ...validAlert,
                description: 'More details',
                status: 'active',
                importance: 'high',
            });
            expect(error).toBeUndefined();
        });

        test('rejects invalid importance', () => {
            const { error } = sendAlertSchema.validate({ ...validAlert, importance: 'urgent' });
            expect(error).toBeDefined();
        });
    });
});
