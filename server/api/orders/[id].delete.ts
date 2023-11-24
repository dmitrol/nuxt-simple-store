import Order from '~/server/models/Order.model';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // delete order
  try {
    await Order.findByIdAndDelete(id);
    return { message: 'Order deleted' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
