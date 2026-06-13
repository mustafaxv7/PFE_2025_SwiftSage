import { sendFeedbackSchema } from '../feedback.validation.js';

describe('Feedback Validation', () => {
    describe('sendFeedbackSchema', () => {
        test('accepts valid feedback', () => {
            const { error } = sendFeedbackSchema.validate({ message: 'Great app!' });
            expect(error).toBeUndefined();
        });

        test('accepts feedback with rating', () => {
            const { error } = sendFeedbackSchema.validate({ message: 'Good', rating: 5 });
            expect(error).toBeUndefined();
        });

        test('requires message', () => {
            const { error } = sendFeedbackSchema.validate({});
            expect(error).toBeDefined();
        });

        test('rejects empty message', () => {
            const { error } = sendFeedbackSchema.validate({ message: '' });
            expect(error).toBeDefined();
        });

        test('rejects rating below 1', () => {
            const { error } = sendFeedbackSchema.validate({ message: 'Good', rating: 0 });
            expect(error).toBeDefined();
        });

        test('rejects rating above 5', () => {
            const { error } = sendFeedbackSchema.validate({ message: 'Good', rating: 6 });
            expect(error).toBeDefined();
        });

        test('accepts integer ratings 1-5', () => {
            for (let r = 1; r <= 5; r++) {
                const { error } = sendFeedbackSchema.validate({ message: 'Good', rating: r });
                expect(error).toBeUndefined();
            }
        });

        test('rejects non-integer rating', () => {
            const { error } = sendFeedbackSchema.validate({ message: 'Good', rating: 3.5 });
            expect(error).toBeDefined();
        });
    });
});
