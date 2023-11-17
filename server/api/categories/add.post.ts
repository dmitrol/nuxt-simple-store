import Category from '~/server/models/Category.model';
import { CategoryValidator } from '~/server/validation';

export default defineEventHandler(async (event) => {
  // get data from body
  const body = await readBody(event);

  // validate
  const { error } = CategoryValidator.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ''),
      statusCode: 400,
      fatal: false,
    });
  }

  // add category
  try {
    await Category.create(body);
    return { message: 'Category added' };
  } catch (error) {
    throw createError({
      message: error as string,
    });
  }
});
