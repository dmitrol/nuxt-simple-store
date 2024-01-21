import { unlink } from 'node:fs';
import Product from '~/server/models/Product.model';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');
  // image file directory
  const imagesDir: string = useRuntimeConfig().public.PRODUCT_IMAGE_DIR
  // delete product
  try {
    const product = await Product.findById(id);

    if (product !== null) {
      if (product.image !== null) {
        unlink(imagesDir + product.image, () => {});
      }
      await product.deleteOne();
      return { message: 'Product deleted' };
    }
    return { message: 'Product not found' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
