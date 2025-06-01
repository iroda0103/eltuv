<template>
  <div :class="theme">
    <HomePage />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HomePage from './views/HomePage.vue';

const theme = ref('dark');

const initTelegramTheme = () => {
  if (window.Telegram?.WebApp) {
    // const tg = window.Telegram.WebApp;
    // theme.value = tg.colorScheme;

    // // Mavzu o'zgarganda yangilash
    // tg.onEvent('themeChanged', () => {
    //   theme.value = tg.colorScheme;
    // });
  }
};

onMounted(initTelegramTheme);
</script>
<style>
:root {
  /* Light mode o'zgaruvchilari */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --text-primary: #212121;
  --text-secondary: #757575;
  --border-color: #e0e0e0;
  --card-bg: #ffffff;
  --accent-color: #3f51b5;
}

.dark {
  /* Dark mode o'zgaruvchilari */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #9e9e9e;
  --border-color: #424242;
  --card-bg: #1e1e1e;
  --accent-color: #7986cb;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
   font-family: -apple-system, system-ui, sans-serif;
}

</style>