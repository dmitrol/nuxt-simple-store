import Product from '~/server/models/Product.model';

export default defineEventHandler(async () => {
  // return all products
  return await Product.find().populate('categories');
});
