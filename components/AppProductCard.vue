<template>
  <div>
    <div class="product-card">
      <NuxtLink :to="'/products/' + product._id">
        <div class="product-card__image">
          <img v-if="product.image" :src="imagehandler.resolveImagePath(product.image)" />
        </div>
      </NuxtLink>
      <NuxtLink class="product-card__title" :to="'/products/' + product._id">
        <span>
          {{ product.title }}
        </span>
      </NuxtLink>
      <div class="product-card__price">{{ product.price }} грн.</div>
      <div class="product-card__button" @click="basketStore.putProduct(product)">
        <Button label="В корзину" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from '@/types';

const basketStore = useBasketStore();
const imagehandler = useImagehandler();

defineProps<{
  product: IProduct;
}>();
</script>

<style scoped>
.product-card {
  width: 400px;
  max-width: 400px;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
  /* box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12); */
}
.product-card__image {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-card__image img {
  max-width: 400px;
  max-height: 400px;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
.product-card__title {
  display: block;
  max-width: 400px;
  min-height: 60px;
  margin-top: 8px;
  padding: 0 10px;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  text-decoration: none;
  color: var(--product-title-color);
}

.product-card__price {
  max-width: 400px;
  margin-top: 8px;
  padding: 0 10px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: var(--product-price-color);
}
.product-card__button {
  margin: 30px 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
