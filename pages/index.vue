<template>
  <div>
    <div class="product-container">
      <div v-for="product of productStore.products" :key="product._id">
        <div class="product-item">
          <AppProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const productStore = useProductStore();

definePageMeta({
  layout: 'default',
});

useAsyncData(async () => await productStore.getAll(), {
  initialCache: false,
});
</script>

<style scoped>
.product-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -25px;
}
.product-item {
  margin: 0 25px 50px 25px;
}
</style>
