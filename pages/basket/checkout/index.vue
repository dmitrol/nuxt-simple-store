<template>
  <div>
    <template v-if="!orderStatus">
      <div class="checkout-title">Оформление заказа</div>
      <div class="checkout-sum">Сумма заказа: {{ basketStore.totalCost }} грн.</div>
      <div class="checkout-form">
        <div class="form-row">
          <label for="name">Имя</label>
          <InputText
            id="name"
            v-model.trim="name"
            type="text"
            :class="{ 'p-invalid': nameErrorMessage }"
            :style="{ width: '480px' }"
            aria-describedby="text-error"
          />
          <small v-if="nameErrorMessage" id="name" class="p-error">Не менее 3 символов</small>
        </div>

        <div class="form-row">
          <label for="telephone">Телефон</label>
          <InputMask
            id="telephone"
            v-model="telephone"
            mask="(999) 99-99-999"
            :class="{ 'p-invalid': telephoneErrorMessage }"
            :style="{ width: '480px' }"
            aria-describedby="mask-error"
          />
          <small v-if="telephoneErrorMessage" id="telephone" class="p-error">Телефон обязателен</small>
        </div>

        <div class="checkout-form__btn">
          <Button label="Подтвердить заказ" @click="confirmOrder" />
        </div>
      </div>
      <div class="checkout-link">
        <NuxtLink to="/basket">Назад в корзину</NuxtLink>
      </div>
    </template>

    <template v-else>
      <div class="order-success">
        <span> Заказ оформлен </span>
        <NuxtLink to="/">На главную</NuxtLink>
      </div>
    </template>

    <ClientOnly>
      <Toast />
    </ClientOnly>
  </div>
</template>

<script setup>
const toast = useToast();
const orederStore = useOrderStore();
const basketStore = useBasketStore();

const name = ref('');
const telephone = ref('');
const nameErrorMessage = ref(false);
const telephoneErrorMessage = ref(false);
const orderStatus = ref(false);

async function confirmOrder() {
  const result = validateForm();
  if (result) {
    await orederStore
      .add({
        name: name.value,
        telephone: telephone.value,
        items: basketStore.basket,
        sum: basketStore.totalCost,
      })
      .then(() => {
        basketStore.reset();
        orderStatus.value = true;
      })
      .catch(() => {
        toast.add({
          severity: 'error',
          summary: 'error',
          detail: 'Что-то пошло не так',
          life: 3000,
        });
      });
  }
}

function validateForm() {
  resetErrorsForm();
  if (name.value.length < 3) {
    nameErrorMessage.value = true;
  }
  if (!telephone.value) {
    telephoneErrorMessage.value = true;
  }
  return !nameErrorMessage.value && !telephoneErrorMessage.value;
}
function resetErrorsForm() {
  nameErrorMessage.value = false;
  telephoneErrorMessage.value = false;
}
</script>

<style lang="scss" scoped>
.checkout-title {
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 24px;
}
.checkout-sum {
  margin-bottom: 24px;
}
.checkout-form {
  max-width: 480px;
  &__btn {
    margin-top: 24px;
  }
}
.checkout-link {
  margin: 16px 0 32px 0;
}

.order-success {
  font-size: 24px;
  line-height: 30px;
  span {
    display: block;
    margin-bottom: 16px;
  }
}
</style>
