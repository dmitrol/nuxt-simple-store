import Order from '~/server/models/Order.model';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // return product by id
  try {
    return await Order.findById(id).populate('items.product');
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
