import Joi from 'joi';

export const createFeedValidation = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().required(),
  source: Joi.string().valid('El País', 'El Mundo').required(),
  url: Joi.string().uri().required()
});

export const updateFeedValidation = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string(),
  source: Joi.string().valid('El País', 'El Mundo'),
  url: Joi.string().uri()
});