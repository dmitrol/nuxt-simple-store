<template>
  <div class="admin-page">
    <div>
      <div class="admin-page__title">Заказы</div>
    </div>
    <div class="card">
      <div v-if="orederStore.orders.length > 0">
        <DataTable
          :value="orederStore.orders"
          paginator
          size="small"
          table-style="auto"
          :rows="5"
          :rows-per-page-options="[5, 10, 20, 50]"
        >
          <Column field="name" header="Имя" style="min-width: 150px" />
          <Column field="telephone" header="Телефон" style="min-width: 100px" />
          <Column field="sum" header="Cумма" style="min-width: 100px" />
          <Column header="Создан" style="width: 220px">
            <template #body="{ data }">
              <div v-if="data.createdAt">
                {{ dayjs(data.createdAt).format('MMM DD, YYYY HH:mm') }}
              </div>
            </template>
          </Column>
          <Column header="Действия" style="width: 250px">
            <template #body="slotProps">
              <div class="action-buttons">
                <Button
                  label="Открыть"
                  severity="info"
                  size="small"
                  @click="router.push('/admin/orders/' + slotProps.data._id)"
                />
                <Button
                  class="delete-btn"
                  label="Удалить"
                  severity="danger"
                  size="small"
                  @click="deleteOrder(slotProps.data._id)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <div v-else class="empty-list">Список заказов пуст</div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
definePageMeta({
  layout: 'admin',
});

const router = useRouter();
const orederStore = useOrderStore();
const toast = useToast();

useAsyncData(async () => await orederStore.getAll(), {
  initialCache: false,
});

async function deleteOrder(id) {
  await orederStore
    .remove(id)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'success',
        detail: 'Заказ успешно удален',
        life: 3000,
      });
    })
    .catch((error) => {
      toast.add({
        severity: 'error',
        summary: 'error',
        detail: error?.data?.message,
        life: 3000,
      });
    });
}
</script>
