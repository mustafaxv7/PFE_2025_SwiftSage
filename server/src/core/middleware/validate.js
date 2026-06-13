import { ValidationError } from '../errors/ValidationError.js';

export const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const details = error.details.map((d) => ({
                field: d.path.join('.'),
                message: d.message,
            }));
            return next(new ValidationError(details));
        }
        req[property] = value;
        next();
    };
};
