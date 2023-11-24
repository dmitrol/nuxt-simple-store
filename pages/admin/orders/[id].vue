<template>
  <div>
    <div v-if="orederStore.order !== null">
      <div class="info">
        <div class="info__header">Заказ: {{ orederStore.order._id }}</div>
        <div>Имя: {{ orederStore.order.name }}</div>
        <div>Телефон: {{ orederStore.order.telephone }}</div>
      </div>

      <div class="card">
        <DataTable :value="orederStore.order.items" size="small" table-style="auto">
          <Column field="product.title" header="Название" style="min-width: 150px" />
          <Column field="quantity" header="Количество" style="min-width: 150px" />
          <Column field="product.price" header="Цена" style="min-width: 150px" />
          <Column header="Стоимость" style="min-width: 100px">
            <template #body="slotProps">
              <span>{{ slotProps.data.product.price * slotProps.data.quantity }}</span>
            </template>
          </Column>
        </DataTable>

        <div class="order-total app-full-width app-flex-end">
          <div>Сумма заказа</div>
          <div>{{ orederStore.totalCostOrder }}</div>
        </div>
      </div>

      <div class="actions">
        <NuxtLink to="/admin/orders">Назад к заказам</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
});

const route = useRoute();
const orederStore = useOrderStore();

const id = route.params.id;

onMounted(async () => {
  await orederStore.getOne(id);
});
</script>

<style scoped lang="scss">
.info {
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 24px;
  &__header {
    margin-bottom: 4px;
  }
}
.order-total {
  margin-top: 32px;
  padding: 0 10px;
  div {
    margin-left: 20px;
  }
}
.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
