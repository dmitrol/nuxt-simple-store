import { defineStore } from 'pinia';
import { AppThemes } from '~/types';

export const useMainStore = defineStore('main-store', {
  state: () => ({
    theme: 'dark' as AppThemes,
  }),
  actions: {
    initTheme() {
      try {
        const theme = localStorage.getItem('theme');
        if (theme === null) {
          localStorage.setItem('theme', this.theme);
        } else {
          this.theme = theme as AppThemes;
        }
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },

    toggleTheme() {
      try {
        if (this.theme === 'light') {
          this.theme = 'dark' as AppThemes;
        } else {
          this.theme = 'light' as AppThemes;
        }
        localStorage.setItem('theme', this.theme);
      } catch (error) {
        throw createError({
          message: error as string,
        });
      }
    },
  },
});
