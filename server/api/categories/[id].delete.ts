import Category from '~/server/models/Category.model';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // delete category
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
