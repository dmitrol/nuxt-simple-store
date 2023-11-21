<template>
  <div>
    <div class="header">Корзина</div>
    <template v-if="basketStore.basket.length > 0">
      <ClientOnly>
        <div class="card">
          <div>
            <DataTable :value="basketStore.basket" size="small">
              <Column field="product.title" header="Продукт" style="min-width: 150px" />
              <Column header="Цена" style="width: 80px">
                <template #body="slotProps">
                  <span>{{ slotProps.data.product.price }}</span>
                </template>
              </Column>
              <Column header="Количество" style="width: 140px">
                <template #body="slotProps">
                  <InputNumber
                    id="price"
                    v-model="slotProps.data.quantity"
                    input-id="minmax-buttons"
                    mode="decimal"
                    :min="1"
                    :max="999"
                    show-buttons
                    :input-style="{ width: '60px' }"
                    @update:model-value="basketStore.saveInStorage"
                  />
                </template>
              </Column>
              <Column header="Итог" style="width: 100px">
                <template #body="slotProps">
                  <span>{{ slotProps.data.product.price * slotProps.data.quantity }}</span>
                </template>
              </Column>
              <Column style="width: 50px">
                <template #body="slotProps">
                  <div @click="basketStore.deleteProduct(slotProps.data.product._id)">
                    <i class="pi pi-trash" style="font-size: 1rem" />
                  </div>
                </template>
              </Column>
            </DataTable>

            <div class="basket-total app-full-width app-flex-end">
              <div>Сумма заказа</div>
              <div>{{ basketStore.totalCost }}</div>
            </div>
          </div>
        </div>
      </ClientOnly>
      <div class="basket-btn">
        <Button label="Оформить" />
      </div>
    </template>
    <template v-else>
      <p class="basket-empty">Корзина пуста</p>
    </template>
  </div>
</template>

<script setup lang="ts">
const basketStore = useBasketStore();
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
}
.basket-total {
  margin-top: 32px;
  padding: 0 10px;
  div {
    margin-left: 20px;
  }
}
.basket-btn {
  margin-top: 24px;
  text-align: end;
}
.basket-empty {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}
</style>
