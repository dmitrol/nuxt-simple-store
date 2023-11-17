<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();
const mainStore = useMainStore();

const theme = computed(() => {
  return mainStore.theme;
});

onMounted(() => {
  mainStore.initTheme();
  if (theme.value === 'dark') {
    PrimeVue.changeTheme('lara-light-indigo', 'lara-dark-indigo', 'theme-link', () => {});
  }
});

watch(theme, () => {
  setTheme();
});

function setTheme() {
  if (theme.value === 'light') {
    PrimeVue.changeTheme('lara-dark-indigo', 'lara-light-indigo', 'theme-link', () => {});
  } else {
    PrimeVue.changeTheme('lara-light-indigo', 'lara-dark-indigo', 'theme-link', () => {});
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: var(--surface-ground);
}
</style>
