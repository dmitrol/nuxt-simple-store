import { defineStore } from 'pinia';
import { ICategory, ICategoryTemplate } from '~/types';

export const useCategoryStore = defineStore('category-store', {
  state: () => ({
    categories: [] as ICategory[],
  }),
  actions: {
    async getAll() {
      try {
        const data = await $fetch<ICategory[]>('/api/categories/');
        this.categories = data;
        return data as ICategory[];
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    async add(category: ICategoryTemplate) {
      await $fetch('/api/categories/add', {
        method: 'POST',
        body: category,
      }).then(async () => {
        await this.getAll();
      });
    },

    async update(id: String, category: ICategory) {
      await $fetch(`/api/categories/${id}`, {
        method: 'PUT',
        body: category,
      }).then(async () => {
        await this.getAll();
      });
    },

    async remove(id: String) {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      }).then(async () => {
        await this.getAll();
      });
    },
  },
});
