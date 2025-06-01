<template>
  <div class="container">
    <!-- Location Selector -->
    <div class="location-selector">
      <select v-model="selectedLocation" @change="filterByLocation" class="location-select">
        <option v-for="location in locations" :key="location.id" :value="location">
          {{ location.name }}
        </option>
      </select>
      <i class="location-icon">📍</i>
    </div>

    <!-- Search Component -->
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="Search for restaurants, food or products..."
        class="search-input" />
      <button class="search-btn">
        <i class="search-icon">🔍</i>
      </button>
    </div>

    <!-- Restaurants List -->
    <div class="section">
      <h2 class="section-title">Restaurants in {{ selectedLocation.name }}</h2>
      <div v-if="filteredRestaurants.length">
        <RestaurantCard v-for="restaurant in filteredRestaurants" :key="restaurant.id" :restaurant="restaurant"
          @select="showRestaurantMenu" />
      </div>
      <div v-else class="empty-state">
        No restaurants found in this area
      </div>
    </div>

    <!-- Food Menu Modal -->
    <FoodMenuModal v-if="selectedRestaurant" :restaurant="selectedRestaurant" @close="selectedRestaurant = null"
      @add-to-cart="addToCart" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import FoodMenuModal from '../components/FoodMenuModal.vue';

// Locations data
const locations = [
  { id: 1, name: "O'ratepa ko'chasi" },
  { id: 2, name: "Amir Temur shoh ko'chasi" },
  { id: 3, name: "Yunusobod tumani" },
  { id: 4, name: "Chilonzor tumani" },
  { id: 5, name: "Mirzo Ulug'bek tumani" },
];

// Restaurant data with location IDs
const restaurantsData = [
  {
    id: 1,
    name: "Osh Markazi",
    locationId: 1,
    cuisine: "Uzbek, Asian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    image: "osh.jpg",
    menu: [
      { id: 101, name: "Osh", price: 25000, description: "Traditional Uzbek Plov" },
      { id: 102, name: "Lag'mon", price: 22000, description: "Hand-pulled noodles" }
    ]
  },
  {
    id: 2,
    name: "Burger House",
    locationId: 1,
    cuisine: "Fast Food",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image: "burger.jpg",
    menu: [
      { id: 201, name: "Cheeseburger", price: 18000, description: "Beef patty with cheese" },
      { id: 202, name: "French Fries", price: 8000, description: "Crispy potato fries" }
    ]
  },
  {
    id: 3,
    name: "Sushi Master",
    locationId: 2,
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "40-50 min",
    image: "sushi.jpg",
    menu: [
      { id: 301, name: "California Roll", price: 32000, description: "Crab, avocado, cucumber" },
      { id: 302, name: "Miso Soup", price: 12000, description: "Traditional Japanese soup" }
    ]
  },
  {
    id: 4,
    name: "Anor",
    locationId: 3,
    cuisine: "Uzbek, European",
    rating: 4.9,
    deliveryTime: "25-35 min",
    image: "anor.jpg",
    menu: [
      { id: 401, name: "Manti", price: 22000, description: "Steamed dumplings" },
      { id: 402, name: "Salad Bar", price: 18000, description: "Fresh vegetable selection" }
    ]
  }
];

const selectedLocation = ref(locations[0]);
const searchQuery = ref("");
const selectedRestaurant = ref(null);
const restaurants = ref(restaurantsData);
const colorScheme = ref('light');

const filteredRestaurants = computed(() => {
  // First filter by location
  let result = restaurants.value.filter(
    r => r.locationId === selectedLocation.value.id
  );

  // Then filter by search query if exists
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query)
    );
  }

  return result;
});

function showRestaurantMenu(restaurant) {
  selectedRestaurant.value = restaurant;
}

function addToCart(item) {
  console.log("Added to cart:", item);
  // Implement cart logic
}

// Optional: Save selected location to localStorage
onMounted(() => {
  const savedLocation = localStorage.getItem('selectedLocation');
  if (savedLocation) {
    selectedLocation.value = locations.find(l => l.id === parseInt(savedLocation)) || locations[0];
  }

  if (window.Telegram && window.Telegram.WebApp) {
    colorScheme.value = window.Telegram.WebApp.colorScheme;
    console.log("Telegram WebApp color scheme:", colorScheme.value);

  }
});

function filterByLocation() {
  // Save selection to localStorage
  localStorage.setItem('selectedLocation', selectedLocation.value.id);
}
</script>

<style scoped>
.container {
  padding: 16px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.location-selector {
  position: relative;
  margin-bottom: 16px;
}

.location-select {
  width: 100%;
  padding: 14px 40px 14px 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  appearance: none;
  background-color: white;
}

.location-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-container {
  display: flex;
  margin-bottom: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.search-input {
  flex: 1;
  padding: 14px;
  border: none;
  outline: none;
  font-size: 16px;
}

.search-btn {
  background: transparent;
  border: none;
  padding: 0 16px;
  cursor: pointer;
}

.section {
  margin-top: 24px;
}

.section-title {
  font-size: 1.4rem;
  margin-bottom: 16px;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #888;
}

.container {
  padding: 16px;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.location-selector {
  position: relative;
  margin-bottom: 16px;
}

.location-select {
  width: 100%;
  padding: 14px 40px 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 16px;
  appearance: none;
  background-color: var(--card-bg);
  color: var(--text-primary);
}

.search-container {
  border: 1px solid var(--border-color);
  background: var(--card-bg);
}

.search-input {
  color: var(--text-primary);
  background: var(--card-bg);
}

.section-title {
  color: var(--text-primary);
}

.empty-state {
  color: var(--text-secondary);
}
</style>