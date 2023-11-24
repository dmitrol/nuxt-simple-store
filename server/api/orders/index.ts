import Order from '~/server/models/Order.model';

export default defineEventHandler(async () => {
  // return all order
  return await Order.find().populate('items.product');
});
