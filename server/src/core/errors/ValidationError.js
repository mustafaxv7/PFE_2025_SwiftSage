import { AppError } from './AppError.js';

export class ValidationError extends AppError {
    constructor(details) {
        super('Validation failed', 400, 'VALIDATION_ERROR');
        this.details = details;
    }
}
