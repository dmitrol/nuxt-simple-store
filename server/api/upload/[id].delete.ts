import { unlink } from 'node:fs';

export default defineEventHandler((event) => {
  // get id from params
  const image = getRouterParam(event, 'id');
  try {
    unlink(useRuntimeConfig().public.PRODUCT_IMAGE_DIR + image, () => {});
    return { ok: true, message: 'file deleted' };
  } catch (e) {
    return e;
  }
});
