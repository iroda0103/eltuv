<template>
    <div class="container home-container">
        <div class="conteiner app-header">
            <AppSearch @update:searchQuery="handleSearchChange" />
            <AppLocation @update:selectedLocation="handleLocationChange" :locations="cityStore.cities" />
        </div>

        <!-- <div class="section">
            <h2 class="section-title">{{ 'Burgers' }}</h2>
            <div class="restaurant-wrapper">
                <router-link v-for="restaurant in restaurantStore.restaurants" :key="restaurant.id"
                    :to="`/restaurant/${restaurant.id}`">
                    <RestaurantCard :restaurant="restaurant" @select="showRestaurantMenu" />
                </router-link>
            </div>
        </div> -->
        
        <div class="section" v-for="category in restaurantStore.categoryRestaurants" :key="`category_${category.categoryName}`">
            <h2 class="section-title">{{ category.category || ''}}</h2>
            <div v-if="category.restaurants.length" class="restaurant-wrapper">
                <router-link v-for="restaurant in category.restaurants" :key="restaurant.id"
                    :to="`/restaurant/${restaurant.id}`">
                    <RestaurantCard :restaurant="restaurant" @select="showRestaurantMenu" />
                </router-link>
            </div>
            <div v-else class="empty-state">No restaurants found in this area</div>
        </div>

    </div>
</template>
    
<script setup>
import { onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'

import RestaurantCard from '../components/RestaurantCard.vue'
// import FoodMenuModal from '../components/OrderModal.vue'
import AppLocation from '../components/AppLocation.vue'
import AppSearch from '../components/AppSearch.vue'

import { useCityStore } from '../store/city.store'
import { useRestaurantStore } from '../store/restaurant.store.js'

// const route = useRoute()

const cityStore = useCityStore()
const restaurantStore = useRestaurantStore()

const selectedLocation = ref(null)
const searchQuery = ref('')
const selectedRestaurant = ref(null)
let timeout;

onMounted(async () => {
    await cityStore.fetchCities()
    await restaurantStore.fetchRestaurants()
    
    console.log('dddddddd',restaurantStore.categoryRestaurants,'restaurantStore:', restaurantStore.restaurants);

    const savedLocation = localStorage.getItem('selectedLocation')
    if (savedLocation) {
        const found = cityStore.cities.find(l => l.id === parseInt(savedLocation))
        if (found) selectedLocation.value = found
    } else {
        selectedLocation.value = cityStore.cities[0] // default
    }

    if (window.Telegram && window.Telegram.WebApp) {
        console.log('Telegram color scheme:', window.Telegram.WebApp.colorScheme)
    }
})

function handleSearchChange(val) {
    searchQuery.value = val

    clearTimeout(timeout)
    timeout = setTimeout(() => {
        restaurantStore.searchRestaurant({ q: val, cityFilter: selectedLocation.value })
    }, 400)
}

function handleLocationChange(location) {
    selectedLocation.value = location
    restaurantStore.searchRestaurant({ cityFilter: location, q: searchQuery.value })
}

function showRestaurantMenu(restaurant) {
    // selectedRestaurant.value = restaurant
    // restaurantStore.fetchRestaurant(restaurant.id)
    console.log(restaurantStore.selectedRestaurant,selectedRestaurant,restaurant);
    
}

// watch(
//     () => route.query.location,
//     newVal => {
//         const matched = cityStore.cities.find(l => l.id === parseInt(newVal))
//         if (matched) selectedLocation.value = matched
//         restaurantStore.searchRestaurant({ cityFilter: newVal })

//     }
// )

</script>

<style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    gap: 14px;
    margin-right: 12px;
}

.home-container {
    padding-right: 0 !important;
    padding-top: 0;
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

.section-title {
    color: var(--text-primary);
}

.empty-state {
    color: var(--text-secondary);
}

.restaurant-wrapper {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    gap: 16px;
}
</style>
