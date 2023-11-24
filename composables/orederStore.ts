import { defineStore } from 'pinia';
import { IOrder, IOrderTemplate, IBasketItem } from '~/types';

export const useOrderStore = defineStore('oreder-store', {
  state: () => ({
    orders: [] as IOrder[],
    order: null as IOrder | null,
  }),
  getters: {
    totalCostOrder: (state) => {
      if (state.order === null) {
        return 0;
      } else {
        return state.order.items.reduce((total: number, item: IBasketItem) => {
          return total + item.product.price * item.quantity;
        }, 0);
      }
    },
  },

  actions: {
    async getAll() {
      try {
        const data = await $fetch<IOrder[]>('/api/orders/');
        this.orders = data;
        return data as IOrder[];
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    async getOne(id: String) {
      try {
        const data = await $fetch<IOrder>(`/api/orders/${id}`);
        this.order = data;
        return data as IOrder;
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    async add(order: IOrderTemplate) {
      await $fetch('/api/orders/add', {
        method: 'POST',
        body: order,
      }).then(async () => {
        await this.getAll();
      });
    },

    async remove(id: String) {
      await $fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      }).then(async () => {
        await this.getAll();
      });
    },
  },
});
