import Category from '~/server/models/Category.model';
import { CategoryValidator } from '~/server/validation';

export default defineEventHandler(async (event) => {
  // get id from params
  const id = getRouterParam(event, 'id');

  // get data from body
  const body = await readBody(event);

  // validate
  const { error } = CategoryValidator.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false,
    });
  }

  // update category
  try {
    await Category.findByIdAndUpdate(id, body);
    return { message: 'Category updated' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
