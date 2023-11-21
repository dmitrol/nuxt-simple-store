import { defineStore } from 'pinia';
import { IBasketItem, IProduct } from '~/types';

export const useBasketStore = defineStore('basket-store', {
  state: () => ({
    basket: [] as IBasketItem[],
  }),
  getters: {
    totalProducts: (state) => {
      return state.basket.reduce((total: number, item: IBasketItem) => {
        return total + +item.quantity;
      }, 0);
    },
    totalCost: (state) => {
      return state.basket.reduce((total: number, item: IBasketItem) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },
  },
  actions: {
    init() {
      try {
        const data = localStorage.getItem('basket');
        if (data === null) {
          this.saveInStorage();
        } else {
          this.basket = JSON.parse(data) as IBasketItem[];
        }
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    saveInStorage() {
      localStorage.setItem('basket', JSON.stringify(this.basket));
    },

    putProduct(product: IProduct, quantity: number = 1) {
      const index = this.basket.findIndex((item) => item.product._id === product._id);
      if (index === -1) {
        this.basket.push({ product, quantity });
      } else {
        this.basket[index] = { product, quantity: this.basket[index].quantity + quantity };
      }
      this.saveInStorage();
    },

    deleteProduct(productId: string) {
      const index = this.basket.findIndex((item) => item.product._id === productId);
      if (index >= 0) {
        this.basket.splice(index, 1);
        this.saveInStorage();
      }
    },
  },
});
