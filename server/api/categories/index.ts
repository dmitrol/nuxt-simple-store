import Category from '~/server/models/Category.model';

export default defineEventHandler(async () => {
  // return all categories
  return await Category.find();
});
