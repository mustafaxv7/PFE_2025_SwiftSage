import Joi from 'joi';

export const addReportSchema = Joi.object({
    reportData: Joi.string().required(),
    reportDetailsData: Joi.string().optional(),
    additionalData: Joi.string().optional(),
});

export const editReportSchema = Joi.object({
    description: Joi.string().optional(),
    reportDetailsData: Joi.object().optional(),
});

export const switchStatusSchema = Joi.object({
    status: Joi.string().valid('Active', 'Resolved', 'Critical').required(),
});
