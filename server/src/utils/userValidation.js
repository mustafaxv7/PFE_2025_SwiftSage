import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(20).required(),
    password: Joi.string().min(8).required(),
    isOrganisationMember: Joi.boolean().default(false),
    community: Joi.string().required(),
    type: Joi.string().valid('public', 'private').optional()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
