import Product from '~/server/models/Product.model';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // delete product
  try {
    await Product.findByIdAndDelete(id);
    return { message: 'Product deleted' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
