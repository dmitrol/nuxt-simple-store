// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          id: 'theme-link',
          rel: 'stylesheet',
          href: '/' + 'themes/lara-light-indigo/theme.css',
        },
      ],
    },
  },
  css: ['primeicons/primeicons.css', '@/assets/styles/index.scss'],
  modules: ['@pinia/nuxt', 'nuxt-primevue'],
  build: {
    transpile: ['primevue'],
  },
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
    },
    components: {
      include: [
        'Button',
        'DataTable',
        'Column',
        'Card',
        'Dialog',
        'InputText',
        'InputNumber',
        'InputMask',
        'Textarea',
        'MultiSelect',
        'Tag',
        'Toast',
        'Card',
        'Badge',
        'FileUpload',
        'Image',
      ],
    },
  },

  nitro: {
    plugins: ['@/server/db/index.ts'],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    public: {
      PRODUCT_IMAGE_DIR: process.env.PRODUCT_IMAGE_DIR,
    },
  },
});
