import Joi from 'joi';

export const CategoryValidator = Joi.object({
  title: Joi.string().min(3).required(),
});

export const ProductValidator = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  categories: Joi.array(),
  price: Joi.number().required(),
});
