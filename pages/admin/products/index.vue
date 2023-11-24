<template>
  <div class="admin-page">
    <div>
      <div class="admin-page__title">Список товаров</div>
    </div>
    <ClientOnly>
      <div class="card">
        <div v-if="productStore.products.length > 0">
          <DataTable
            :value="productStore.products"
            size="small"
            :rows="5"
            :rows-per-page-options="[5, 10, 20, 50]"
            paginator
          >
            <Column field="title" header="Название" style="min-width: 120px" />
            <Column field="description" header="Описание" style="min-width: 100px" />
            <Column field="categories" header="Категории" style="min-width: 150px">
              <template #body="slotProps">
                <span>{{ resolveCategoriesCell(slotProps.data.categories) }}</span>
              </template>
            </Column>
            <Column field="price" header="Цена" style="width: 100px" />
            <Column field="_id" header="Действия" style="width: 200px">
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
                    label="Удалить"
                    class="delete-btn"
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
      <Dialog v-model:visible="productModal" class="p-fluid" :style="{ width: '480px' }" header="Товар" modal>
        <div class="form-row">
          <label for="title">Название</label>
          <InputText
            id="title"
            v-model.trim="state.productFormData.title"
            :class="{ 'p-invalid': formErrorObject.title }"
            :style="{ width: '100%' }"
            type="text"
            autofocus
            aria-describedby="text-error"
          />
          <small v-if="formErrorObject.title" class="p-error">Не менее 3 символов</small>
        </div>
        <div class="form-row">
          <label for="description">Описание</label>
          <Textarea
            id="description"
            v-model.trim="state.productFormData.description"
            type="text"
            :class="{ 'p-invalid': formErrorObject.description }"
            :style="{ width: '100%' }"
            rows="3"
            cols="20"
            aria-describedby="text-error"
          />
          <small v-if="formErrorObject.description" class="p-error">Не менее 3 символов</small>
        </div>
        <div class="form-row">
          <label for="description">Категории</label>
          <MultiSelect
            id="categories"
            v-model="state.productFormData.categories"
            option-label="title"
            placeholder="Select a City"
            :options="categoryStore.categories"
          />
        </div>
        <div class="form-row">
          <label for="price">Цена</label>
          <InputText
            id="price"
            v-model.trim="state.productFormData.price"
            type="number"
            :class="{ 'p-invalid': formErrorObject.price }"
            :style="{ width: '100%' }"
            aria-describedby="text-error"
          />
          <small v-if="formErrorObject.price" class="p-error">Должно быть больше нуля</small>
        </div>
        <template #footer>
          <Button v-if="state.productFormData._id" label="OK" autofocus @click="updateCategory" />
          <Button v-else label="OK" autofocus @click="addProduct" />
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

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const toast = useToast();

const productModal = ref(false);
const state = reactive({
  productFormData: {
    description: false,
    categories: [],
    price: false,
  },
});
const formErrorObject = reactive({
  title: '',
  description: '',
  price: 0,
});

useAsyncData(
  async () => {
    await categoryStore.getAll();
    await productStore.getAll();
  },
  {
    initialCache: false,
  },
);

function resolveCategoriesCell(categories) {
  if (categories.length === 0) {
    return 'Нет';
  } else if (categories.length === 1) {
    return categories[0].title;
  } else if (categories.length === 2) {
    return `${categories[0].title}, ${categories[1].title}`;
  } else {
    return `${categories[0].title}, ${categories[1].title}, ...`;
  }
}

async function addProduct() {
  const result = validateForm();
  if (result) {
    await productStore
      .add(state.productFormData)
      .then(() => {
        closeModal();
        toast.add({
          severity: 'success',
          summary: 'success',
          detail: 'Товар успешно добавлен',
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
    await productStore
      .update(state.productFormData._id, state.productFormData)
      .then(() => {
        closeModal();
        toast.add({
          severity: 'success',
          summary: 'success',
          detail: 'Товар успешно обновлен',
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
  await productStore
    .remove(id)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'success',
        detail: 'Товар успешно удален',
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
  resetErrorObject();
  if (state.productFormData.price < 1) {
    formErrorObject.price = true;
  }
  if (state.productFormData.description.length < 3) {
    formErrorObject.description = true;
  }
  if (state.productFormData.title.length < 3) {
    formErrorObject.title = true;
  }

  return !formErrorObject.title && !formErrorObject.description && !formErrorObject.price;
}

function openCreateModal() {
  resetForm();
  productModal.value = true;
}

function openEditModal(product) {
  resetForm();
  state.productFormData = Object.assign({}, product);
  productModal.value = true;
}

function closeModal() {
  productModal.value = true;
  resetForm();
}

function resetForm() {
  resetErrorObject();
  state.productFormData = {
    title: '',
    description: '',
    categories: [],
    price: 0,
  };
}

function resetErrorObject() {
  formErrorObject.title = false;
  formErrorObject.description = false;
  formErrorObject.price = false;
}
</script>

<style lang="scss"></style>
