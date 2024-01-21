export const useImagehandler = () => {
  return {
    resolveImagePath: (imageName: string) => {
      const imagesDir = useRuntimeConfig().public.PRODUCT_IMAGE_DIR || 'assets/images/';
      return `/_nuxt/${imagesDir}${imageName}`;
    },
  };
};
