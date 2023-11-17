<template>
  <div class="admin-page">
    <div>
      <div class="admin-page__title">Категории</div>
    </div>
    <ClientOnly>
      <div class="card">
        <div v-if="categoryStore.categories.length > 0">
          <DataTable
            :value="categoryStore.categories"
            paginator
            size="small"
            table-style="auto"
            :rows="5"
            :rows-per-page-options="[5, 10, 20, 50]"
          >
            <Column field="title" header="Название" style="min-width: 250px" />
            <Column field="_id" header="Действия" style="width: 300px">
              <template #body="slotProps">
                <div class="action-buttons">
                  <Button
                    label="Редактировать"
                    severity="info"
                    size="small"
                    autofocus
                    @click="openEditModal(slotProps.data)"
                  />
                  <Button
                    class="delete-btn"
                    label="Удалить"
                    severity="danger"
                    size="small"
                    autofocus
                    @click="deleteCategory(slotProps.data._id)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>

        <div v-else class="empty-list">Список пуст</div>

        <Button class="create-button" label="Дабавить" autofocus @click="openCreateModal" />
      </div>
    </ClientOnly>

    <ClientOnly>
      <Dialog
        v-model:visible="categoryModal"
        class="p-fluid"
        :style="{ width: '480px' }"
        header="Категория"
        modal
      >
        <div class="form-row">
          <label for="value">Название</label>
          <InputText
            id="value"
            v-model.trim="state.category.title"
            type="text"
            :class="{ 'p-invalid': errorModalMessage }"
            :style="{ width: '100%' }"
            aria-describedby="text-error"
          />
          <small v-if="errorModalMessage" class="p-error">Не менее 3 символов</small>
        </div>
        <template #footer>
          <Button v-if="state.category._id" label="OK" autofocus @click="updateCategory" />
          <Button v-else label="OK" autofocus @click="addCategory" />
        </template>
      </Dialog>
    </ClientOnly>

    <ClientOnly>
      <Toast />
    </ClientOnly>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
});
const categoryStore = useCategoryStore();
const toast = useToast();

const categoryModal = ref(false);
const errorModalMessage = ref(false);
const state = reactive({
  category: {
    title: '',
  },
});

useAsyncData(async () => await categoryStore.getAll(), {
  initialCache: false,
});

async function addCategory() {
  const result = validateForm();
  if (result) {
    await categoryStore
      .add({
        title: state.category.title,
      })
      .then(() => {
        closeModal();
        toast.add({
          severity: 'success',
          summary: 'success',
          detail: 'Категория успешно добавлена',
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
}

async function updateCategory() {
  const result = validateForm();
  if (result) {
    await categoryStore
      .update(state.category._id, state.category)
      .then(() => {
        closeModal();
        toast.add({
          severity: 'success',
          summary: 'success',
          detail: 'Категория успешно обновлена',
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
}

async function deleteCategory(id) {
  await categoryStore
    .remove(id)
    .then(() => {
      closeModal();
      toast.add({
        severity: 'success',
        summary: 'success',
        detail: 'Category deleted successfully',
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

function validateForm() {
  errorModalMessage.value = false;
  if (state.category.title.length < 3) {
    errorModalMessage.value = true;
  }
  return !errorModalMessage.value;
}

function openCreateModal() {
  resetForm();
  categoryModal.value = true;
}

function openEditModal(category) {
  resetForm();
  state.category = { ...category };
  categoryModal.value = true;
}

function closeModal() {
  categoryModal.value = false;
  resetForm();
}

function resetForm() {
  state.category = {
    title: '',
  };
  errorModalMessage.value = false;
}
</script>

<style></style>
