import { IncomingMessage } from 'http';
import formidable from 'formidable';

export default defineEventHandler(async (event) => {
  const nodeRequestObject = event.node.req;
  const imagesDir = useRuntimeConfig().public.PRODUCT_IMAGE_DIR
  let fileName = new Date().valueOf().toString();

  await readFileRequest(nodeRequestObject);

  function readFileRequest(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
      const form = formidable({
        multiples: true,
        uploadDir: imagesDir,
        filename: (name, _ext, part, _form): string => {
          const originalFilename: string = part.originalFilename || '';
          const extension = originalFilename.slice(name.length);
          fileName = fileName + '' + extension;
          return fileName;
        },
      });
      form.parse(req, (error, fields, files) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ ...fields, ...files });
      });
    });
  }

  return { ok: true, file: fileName };
});
