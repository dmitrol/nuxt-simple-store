<template>
  <div>
    <div class="app-flex-between app-full-width">
      <div class="app-flex-between app-full-width header-menu">
        <div class="app-flex-start">
          <NuxtLink to="/admin/products">Продукты</NuxtLink>
          <NuxtLink to="/admin/categories">Категории</NuxtLink>
          <NuxtLink to="/admin/orders">Заказы</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/">На главную</NuxtLink>
        </div>
      </div>

      <div class="header-action app-flex-end">
        <div class="button" @click="mainStore.toggleTheme">
          <i class="pi" :class="mainStore.theme === 'dark' ? 'pi-moon' : 'pi-sun'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainStore = useMainStore();
</script>
