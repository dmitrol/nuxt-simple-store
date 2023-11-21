<template>
  <div>
    <ClientOnly>
      <template v-if="productStore.product !== null">
        <div class="top-content">
          <div class="product-image">
            <img alt="user header" src="/product.jpg" />
          </div>
          <div class="product-data app-full-width">
            <div class="title">{{ productStore.product.title }}</div>
            <div class="price">{{ productStore.product.price }} грн.</div>
            <div class="action">
              <InputNumber
                id="price"
                v-model="quantity"
                input-id="minmax-buttons"
                mode="decimal"
                :min="1"
                :max="999"
                show-buttons
                :input-style="{ width: '60px' }"
                @update:model-value="basketStore.saveInStorage"
              />
              <Button class="action__button" label="В корзину" @click="buyProduct" />
            </div>
            <div class="categories">
              <span class="categories-title">Категории: </span>
              <template v-for="category of productStore.product.categories" :key="category._id">
                <span> {{ category.title }}, </span>
              </template>
            </div>
          </div>
        </div>

        <div class="description">
          <div class="description__header">Описание</div>
          <p class="description__text">
            {{ productStore.product.description }}
          </p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from '~/types';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const basketStore = useBasketStore();

const id: any = route.params.id;
const quantity = ref(1);

onMounted(async () => {
  await productStore.getOne(id);
});

onUpdated(async () => {
  await productStore.getOne(id);
});

function buyProduct() {
  basketStore.putProduct(productStore.product as IProduct, quantity.value);
  router.push('/basket');
}
</script>

<style scoped lang="scss">
.top-content {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  .product-image {
    width: 400px;
    min-width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 400px;
      max-height: 400px;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
    }
  }
}
.top-content .product-data {
  margin-left: 40px;
  .title {
    font-size: 42px;
    line-height: 50px;
    color: var(--product-title-color);
  }
  .price {
    margin: 32px 0;
    font-size: 24px;
    line-height: 32px;
    color: var(--product-price-color);
  }
  .action {
    display: flex;
    &__button {
      margin-left: 16px;
    }
  }
  .categories {
    margin: 32px 0 0 0;
    padding-top: 16px;
    border-top: 1px solid var(--text-color);
    .categories-title {
      font-weight: 600;
    }
  }
}

.description {
  margin: 50px 0;
  &__header {
    margin-bottom: 16px;
    font-size: 26px;
    line-height: 32px;
    color: var(--product-title-color);
  }
}
</style>
