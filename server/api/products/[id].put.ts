import Product from '~/server/models/Product.model';
import { ProductValidator } from '~/server/validation';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // get data from body
  const body = await readBody(event);

  // validate
  const { error } = ProductValidator.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false,
    });
  }

  // update product
  try {
    await Product.findByIdAndUpdate(id, body);
    return { message: 'Product updated' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
