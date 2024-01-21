import Joi from 'joi';

export const CategoryValidator = Joi.object({
  title: Joi.string().min(3).required(),
});

export const ProductValidator = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  categories: Joi.array(),
  price: Joi.number().required(),
  image: Joi.string().allow(null),
});

export const OrderValidator = Joi.object({
  name: Joi.string().min(3).required(),
  telephone: Joi.string().required(),
  sum: Joi.number().required(),
  items: Joi.array(),
});
