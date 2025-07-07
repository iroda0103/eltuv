<template>
  <div :class="theme">
    <!-- <div class="container app-header">
      <AppSearch @update:searchQuery="handleSearchChange" />
      <AppLocation @update:selectedLocation="handleLocationChange" :locations="locations" />
    </div> -->
    <!-- <h1>{{ user?.first_name }},{{ user?.id }}{{ JSON.stringify(user) }}</h1> -->

    <main>
      <RouterView />
    </main>
  </div>
</template>
osh_1749354525538_739b1065cef3e1aa
<script>
import { ref,onMounted } from 'vue';
import { useUserStore } from './store/user.store'
// import AppLocation from './components/AppLocation.vue';
// import AppSearch from './components/AppSearch.vue';

const theme = ref('light');
// const userStore = useUserStore();

const locations = [
  { id: 1, name: "O'ratepa ko'chasi" },
  { id: 2, name: "Amir Temur shoh ko'chasi" },
  { id: 3, name: "Yunusobod tumani" },
  { id: 4, name: "Chilonzor tumani" },
  { id: 5, name: "Mirzo Ulug'bek tumani" },
];
// const selectedLocation = ref(locations[0]);
// const searchQuery = ref("");
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

export default {
  name: 'App',
  components: {
    // AppLocation,
    // AppSearch
  },
    setup() {
    const userStore = useUserStore();
    const user = ref(null);

    onMounted(() => {
      const tg = window.Telegram?.WebApp;
      tg?.expand();

      let tgUser = tg?.initDataUnsafe?.user;
      tgUser = tgUser || {
        id: 1994614192,
        first_name: "Muminova Iroda",
        last_name: "",
        username: "IMuminova",
        language_code: "en",
        allows_write_to_pm: true,
        photo_url: "https://t.me/i/userpic/320/XcyRYIdSoEstZUq_4IjCdhHxfE7yLzyr2x4SLm5w2iA.svg"
      };

      user.value = tgUser;

      // store orqali foydalanuvchini olish
      userStore.fetchUsers({ telegramId: tgUser.id });

      // Telegram mavzusini boshlash
      initTelegramTheme();
    });

    return {
      user,
      userStore
    };
  },
  // async mounted() {
  //   const tg = window.Telegram?.WebApp;
  //   tg?.expand();
  //   let user = tg?.initDataUnsafe?.user;
  //   user = user || {
  //     id: 1994614192,
  //     first_name: "Muminova Iroda",
  //     last_name: "",
  //     username: "IMuminova",
  //     language_code: "en",
  //     allows_write_to_pm: true,
  //     photo_url: "https://t.me/i/userpic/320/XcyRYIdSoEstZUq_4IjCdhHxfE7yLzyr2x4SLm5w2iA.svg"
  //   }
  //   // userStore.fetchUsers(user);
  //   // userStore.ge
  //   console.log('user:', user);
  //   if (user) {
  //     this.user = user;
  //   } else {
  //     console.warn('Telegram user data not available');
  //   }

  //   // Initialize Telegram theme if available
  //   initTelegramTheme();
  // },
  data() {
    return {
      theme,
      locations,
      // user: null,
      initData: null
    };
  },
  methods: {
    handleLocationChange(selectedLocationId) {
      console.log('Selected Location ID:', selectedLocationId, this.$route.query);
      this.$router.push({ query: { ...this.$route.query, location: selectedLocationId } });
    },
    handleSearchChange(search) {
      this.$router.push({ query: { ...this.$route.query, q: search } });
    }
  }
};  
</script>
<style>
.container {
  padding: 16px;
  /* background-color: var(--bg-primary); */
  /* background-color: var(--bg-container); */
  margin: 0 auto;
  max-width: 550px;
  /* min-height: 100vh; */
}
</style>