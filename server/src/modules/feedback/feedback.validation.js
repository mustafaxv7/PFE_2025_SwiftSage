import Joi from 'joi';

export const sendFeedbackSchema = Joi.object({
    userId: Joi.number().required(),
    message: Joi.string().min(1).max(2000).required(),
    rating: Joi.number().integer().min(1).max(5).optional(),
});
