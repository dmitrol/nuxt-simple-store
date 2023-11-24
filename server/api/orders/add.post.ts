import Order from '~/server/models/Order.model';
import { OrderValidator } from '~/server/validation';

export default defineEventHandler(async (event) => {
  // get data from body
  const body = await readBody(event);

  // validate
  const { error } = OrderValidator.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false,
    });
  }
  // add order
  try {
    await Order.create(body);
    return { message: 'Order added' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
