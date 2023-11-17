import Product from '~/server/models/Product.model';
import { ProductValidator } from '~/server/validation';

export default defineEventHandler(async (event) => {
  // get data from body
  const body = await readBody(event);

  // validate
  const { error } = ProductValidator.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false,
    });
  }

  // add product
  try {
    await Product.create(body);
    return { message: 'Product added' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
