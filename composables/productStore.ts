import { defineStore } from 'pinia';
import { IProduct, IProductTemplate } from '~/types';

export const useProductStore = defineStore('product-store', {
  state: () => ({
    products: [] as IProduct[],
    product: null as IProduct | null,
  }),
  actions: {
    async getAll() {
      try {
        const data = await $fetch<IProduct[]>('/api/products/');
        this.products = data;
        return data as IProduct[];
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    async getOne(id: String) {
      try {
        const data = await $fetch<IProduct>(`/api/products/${id}`);
        this.product = data;
        return data as IProduct;
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    async add(category: IProductTemplate) {
      await $fetch('/api/products/add', {
        method: 'POST',
        body: category,
      }).then(async () => {
        await this.getAll();
      });
    },

    async update(id: String, category: IProduct) {
      await $fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: category,
      }).then(async () => {
        await this.getAll();
      });
    },
    async remove(id: String) {
      await $fetch(`/api/products/${id}`, {
        method: 'DELETE',
      }).then(async () => {
        await this.getAll();
      });
    },
  },
});
