<template>
  <div>
    <div class="app-flex-between app-full-width">
      <div class="header-menu app-flex-between app-full-width">
        <div class="app-flex-start">
          <NuxtLink to="/">Главная</NuxtLink>
          <NuxtLink to="/">Все товары</NuxtLink>
          <NuxtLink to="/">Категории</NuxtLink>
          <NuxtLink to="/">Оплата и доставка</NuxtLink>
          <NuxtLink to="/">Контакты</NuxtLink>
          <NuxtLink to="/basket">Корзина</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/admin">Панель Администратора</NuxtLink>
        </div>
      </div>
      <div class="header-action app-flex-end">
        <div class="button" @click="mainStore.toggleTheme">
          <i class="pi" :class="mainStore.theme === 'dark' ? 'pi-moon' : 'pi-sun'" />
        </div>

        <div class="basket">
          <NuxtLink to="/basket">
            <div class="button">
              <i class="pi pi-shopping-cart" style="font-size: 1.5rem" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainStore = useMainStore();
</script>

<style lang="scss" scoped></style>
