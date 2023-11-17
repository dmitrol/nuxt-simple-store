import Product from '~/server/models/Product.model';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // return product by id
  try {
    return await Product.findById(id).populate('categories');
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
