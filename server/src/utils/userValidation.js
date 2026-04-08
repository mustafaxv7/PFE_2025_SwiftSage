import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Username must be at least 3 characters long',
        'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    phone: Joi.string().pattern(/^[0-9+ ]+$/).min(8).max(20).required().messages({
        'string.pattern.base': 'Phone number must contain only numbers, spaces, or +',
        'any.required': 'Phone number is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    }),
    isOrganisationMember: Joi.boolean().default(false),
    community: Joi.string().required().messages({
        'any.required': 'Community is required'
    }),
    type: Joi.string().valid('public', 'private').optional()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().optional()
});
