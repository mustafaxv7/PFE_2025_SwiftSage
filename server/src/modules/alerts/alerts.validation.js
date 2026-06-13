import Joi from 'joi';

export const sendAlertSchema = Joi.object({
    message: Joi.string().min(1).max(500).required(),
    description: Joi.string().max(2000).optional(),
    date: Joi.date().optional(),
    time: Joi.string().optional(),
    status: Joi.string().valid('active', 'resolved').default('active'),
    importance: Joi.string().valid('low', 'medium', 'high', 'critical').default('medium'),
    type: Joi.string().valid('info', 'warning', 'danger').required(),
    location: Joi.string().min(1).max(500).required(),
    affectedArea: Joi.string().min(1).max(500).required(),
});
