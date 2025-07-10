  <template>
    <div class="container menu-page">
      <div class="menu-header">
        <router-link to="/" class="menu-toggle-btn" @click="resetStore"><font-awesome-icon :icon="['fas', 'arrow-left']" /></router-link>
        <h1 class="restaurant__name" :class="{ 'show-element': showElement }">{{ restaurant?.name }}</h1>

        <button class="menu-toggle-btn" @click="changeVisibility">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
      <h1 class="restaurant__name">{{ restaurant?.name }}</h1>

      <!-- <div v-if="loading" class="loading">Yuklanmoqda...</div> -->
      <div v-if="loading" class="loading-state">
        <div class="loading-animation">
          <div class="loading-spinner"></div>
          <p>Menu is loading...</p>
        </div>
      </div>

      <!-- <div v-else-if="error" class="error">Xato yuz berdi: {{ error }}</div> -->
      <div v-else-if="error" class="error-state">
        <div class="error-content">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
          <h3>Oops! Something went wrong</h3>
          <p>{{ error }}</p>
          <button @click="fetchRestaurantData" class="retry-btn">Try Again</button>
        </div>
      </div>
      <div v-else-if="menu.length === 0" class="empty-state">
        <div class="empty-content">
          <font-awesome-icon :icon="['fas', 'utensils']" />
          <h3>Menu Not Available</h3>
          <p>This restaurant hasn't added any items yet</p>
        </div>
      </div>

      <div v-else>
        <div class="restaurant__details">
          <div class="rating">
            <font-awesome-icon :icon="['fas', 'star']" />
            <span> {{ restaurant?.rating || 0 }}</span>
            <p class="sub_title">200+ baho</p>
          </div>
          <div class="delivery-time"><font-awesome-icon class="search-icon" :icon="['fas', 'car']" />
            <span>
              {{ restaurant?.delivery_time || '20-30 min' }}</span>
            <p class="sub_title">Yetkazish</p>
          </div>
          <p> <font-awesome-icon :icon="['fa', 'ellipsis-v']" /> </p>
        </div>

        <p class="restaurant__bonus">
          <font-awesome-icon :icon="['fas', 'gift']" />
          Yetkazib berish tekin
        </p>
        <!-- 
        <div v-for="category in menu" :key="category.id">
          <h3 class="category-title">{{ category.name }}</h3>
          <div class="menu-container">
            <ProductInfo 
              v-for="item in category.products" 
              :key="item.id" 
              :item="item" 
              @add-to-menu="addToMenu"
              @remove-from-menu="removeFromMenu" 
              @clear-menu="clearMenu" 
              :quantity="getQuantity(item.id)" 
            />
          </div>
        </div> -->

        <div>
          <h3 class="category-title">Burgerlar</h3>
          <div class="menu-container">
            <ProductInfo v-for="item in menu" :key="item.id" :item="item" @add-to-menu="addToMenu"
              @remove-from-menu="removeFromMenu" @clear-menu="clearMenu" :quantity="getQuantity(item.id)" />
          </div>
        </div>
      </div>
      <div class="savat_wrapper" v-if="menuStore.menu.length > 0">
        <div @click="getSavat" class="order-button">Buyurtma</div>
      </div>


      <OrderModal v-if="isMenuVisible && menuStore.menu.length > 0" :menu="menuStore.menu"
        @close="isMenuVisible = false" @add-to-menu="addToMenu" @remove-from-menu="removeFromMenu"
        @clear-menu="clearMenu" />
    </div>
  </template>

<script>
import { useMenuStore } from '../store/menu.store.js';
import { useRestaurantStore } from '../store/restaurant.store.js';
import ProductInfo from './ProductInfo.vue';
import OrderModal from './OrderModal.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: "RestaurantMenu",
  components: {
    ProductInfo,
    OrderModal
  },
  setup() {
    const menuStore = useMenuStore();
    const restaurantStore = useRestaurantStore();
    const route = useRoute();

    const loading = ref(false);
    const error = ref(null);
    const showElement = ref(false);
    const isMenuVisible = ref(false);

    const restaurant = ref(null);
    const menu = ref([]);

    const fetchRestaurantData = async () => {
      loading.value = true;
      try {
        menu.value=[]
        const id = parseInt(route.params.id);
        await restaurantStore.fetchRestaurant(id);
        restaurant.value = restaurantStore.selectedRestaurant;
        menu.value = restaurantStore.menu;
        console.log('ddddddddddd', restaurantStore.menu);

      } catch (err) {
        error.value = err.message || 'Xato yuz berdi';
      } finally {
        loading.value = false;
      }
    };

    const handleScroll = () => {
      showElement.value = window.scrollY > 20;
    };

    onMounted(() => {
      fetchRestaurantData();
      window.addEventListener('scroll', handleScroll);
    });

    return {
      menuStore,
      restaurantStore,
      restaurant,
      menu,
      loading,
      error,
      showElement,
      isMenuVisible,
    };
  },
  methods: {
    formatPrice(price) {
      return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || '0';
    },
    addToMenu(item) {
      this.menuStore.setRestaurant(this.restaurant);
      this.menuStore.addToMenu(item);
    },
    removeFromMenu(item) {
      this.menuStore.removeFromMenu(item);
    },
    clearMenu() {
      this.menuStore.clearMenu();
    },
    changeVisibility() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    getQuantity(id) {
      return this.menuStore.getQuantity(id);
    },
    getSavat() {
      this.$router.push({ name: 'SavatPage', path: '/savat' });
    },
    resetStore(){
      this.menu=this.restaurantStore.menu
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
.menu-page {
  padding: 20px;
  background: var(--card-bg);
  border-radius: 12px;
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  padding-top: 50px;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background: #fff;
  width: 100%;
  left: 0;
  padding: 20px;
  padding-bottom: 10px;
}

.menu-header .restaurant__name {
  font-size: 20px;
  display: none;
}

.menu-container {
  display: grid;
 /* grid: auto / auto auto;
  gap: 16px;*/
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  width: 100%;
}

.restaurant__name {
  margin-bottom: 10px;
}

.menu-toggle-btn {
  background-color: transparent;
  color: var(--text-primary);
  text-decoration: none;
  border: none;
  font-size: 15px;
  margin-bottom: 10px;
  cursor: pointer;
}

.restaurant__bonus {
  background-color: rgba(131, 226, 43, 0.411);
  padding: 10px 15px;
  border-radius: 12px;
  color: #319901;
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.restaurant__details {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
}

.restaurant__details>* {
  border-right: 1px solid var(--border-color);
  padding: 10px 15px;
}

.restaurant__details>*>span {
  font-weight: 600;
  color: var(--text-primary);
  margin-left: 6px;
}

.restaurant__details>p {
  font-weight: bold;
  font-size: 20px;
  border-right: none;
}

.sub_title {
  color: #8d8d8d;
  font-size: 13px;
  text-align: center;
}

.order-button {
  background: yellow;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  width: calc(100% - 40px);
  padding: 15px;
  text-align: center;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;

  background: #FFA500;
  color: #222;
  border: none;
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.2s;
}

.menu-header .show-element.restaurant__name {
  display: block;
}

.category-title {
  margin: 10px 0;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: red;
}

.savat_wrapper {
  background: white;
  padding-bottom: 20px;
  position: sticky;
  bottom: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 40px 0;
}

.loading-animation {
  text-align: center;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 165, 0, 0.2);
  border-top-color: #FFA500;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.error-content {
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
}

.error-content svg {
  font-size: 48px;
  color: #ff4444;
  margin-bottom: 15px;
}

.error-content h3 {
  color: var(--text-primary);
  margin-bottom: 10px;
}

.error-content p {
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.retry-btn {
  background: #FFA500;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  background: #e69500;
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.empty-content {
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
}

.empty-content svg {
  font-size: 48px;
  color: #FFA500;
  margin-bottom: 15px;
  opacity: 0.7;
}

.empty-content h3 {
  color: var(--text-primary);
  margin-bottom: 10px;
}

.empty-content p {
  color: var(--text-secondary);
}
</style>