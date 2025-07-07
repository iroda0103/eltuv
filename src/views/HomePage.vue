<!-- <template>
    <div class="container home-container">
        <div class="app-header">
            <AppSearch @update:searchQuery="handleSearchChange" />
            <AppLocation @update:selectedLocation="handleLocationChange" :locations="locations" />
        </div>

        <div class="section" v-for="category in filteredCategories" :key="`category_${category.id}`">
            <h2 class="section-title">{{ category.categoryName }}</h2>
            <div v-if="category.restaurants.length" class="restaurant-wrapper">
                <router-link v-for="restaurant in category.restaurants" :key="restaurant.id"
                    :to="`/restaurant/${restaurant.id}`">
                    <RestaurantCard :restaurant="restaurant" @select="showRestaurantMenu" />
                </router-link>
            </div>
            <div v-else class="empty-state">No restaurants found in this area</div>
        </div>

        <FoodMenuModal v-if="selectedRestaurant" :restaurant="selectedRestaurant" @close="selectedRestaurant = null"
            @add-to-cart="addToCart" />
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import RestaurantCard from '../components/RestaurantCard.vue';
import FoodMenuModal from '../components/OrderModal.vue';
import AppLocation from '../components/AppLocation.vue';
import AppSearch from '../components/AppSearch.vue';

const locations = [
    { id: 1, name: "O'ratepa ko'chasi" },
    { id: 2, name: "Amir Temur shoh ko'chasi" },
    { id: 3, name: "Yunusobod tumani" },
    { id: 4, name: "Chilonzor tumani" },
    { id: 5, name: "Mirzo Ulug'bek tumani" },
];
const categoryData = [
    {
        id: 1,
        categoryName: "Milliy taomlar",
        restaurants: [
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
                id: 4,
                name: "Anor",
                locationId: 1,
                cuisine: "Uzbek, European",
                rating: 4.9,
                deliveryTime: "25-35 min",
                image: "anor.jpg",
                menu: [
                    { id: 401, name: "Manti", price: 22000, description: "Steamed dumplings" },
                    { id: 402, name: "Salad Bar", price: 18000, description: "Fresh vegetable selection" }
                ]
            }
        ]
    },
    {
        id: 2,
        categoryName: "Fast Food",
        restaurants: [
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
            }
        ]
    },
    {
        id: 3,
        categoryName: "Yapon taomlari",
        restaurants: [
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
            }
        ]
    }
];

export default {
    name: 'HomePage',
    components: {
        RestaurantCard,
        FoodMenuModal,
        AppLocation,
        AppSearch
    },
    data() {
        return {
            locations,
            selectedLocation: locations[0],
            searchQuery: "",
            selectedRestaurant: null,
            colorScheme: 'light',
            route: useRoute(),
            categoryData
        };
    },
    computed: {
        filteredRestaurants() {
            let result = this.restaurants.filter(
                r => r.locationId === this.selectedLocation.id
            );

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(r =>
                    r.name.toLowerCase().includes(query) ||
                    r.cuisine.toLowerCase().includes(query)
                );
            }

            return result;
        },
        filteredCategories() {
            return this.categoryData.map(category => {
                const filtered = category.restaurants.filter(r => r.locationId === this.selectedLocation.id);
                const searched = this.searchQuery
                    ? filtered.filter(r =>
                        r.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        r.cuisine.toLowerCase().includes(this.searchQuery.toLowerCase())
                    )
                    : filtered;
                return {
                    ...category,
                    restaurants: searched
                };
            }).filter(cat => cat.restaurants.length > 0); // faqat mavjud restoranli kategoriyalar
        }
    },
    methods: {
        showRestaurantMenu(restaurant) {
            this.selectedRestaurant = restaurant;
        },
        addToCart(item) {
            console.log("Added to cart:", item);
        },
        filterByLocation() {
            localStorage.setItem('selectedLocation', this.selectedLocation.id);
        }
    },
    watch: {
        '$route.query.location'(newVal, oldVal) {
            console.log("Location changed from", oldVal, "to", newVal);
            const matched = this.locations.find(l => l.id === parseInt(newVal));
            if (matched) {
                this.selectedLocation = matched;
            }
        },
        '$route.query.q'(newVal, oldVal) {
            console.log("Search query changed from", oldVal, "to", newVal);
            this.searchQuery = newVal || "";
        }
    },
    mounted() {
        const savedLocation = localStorage.getItem('selectedLocation');
        if (savedLocation) {
            const found = this.locations.find(l => l.id === parseInt(savedLocation));
            if (found) {
                this.selectedLocation = found;
            }
        }

        if (window.Telegram && window.Telegram.WebApp) {
            this.colorScheme = window.Telegram.WebApp.colorScheme;
            console.log("Telegram WebApp color scheme:", this.colorScheme);
        }
    }
};
</script>

<style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    gap: 14px;
}

.home-container {
    padding-right: 0 !important;
    padding-top: 0;
}


/* .section {
  margin-top: 24px;
} */

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
</style> -->
<!-- <div class="section" v-for="category in restaurantStore.restaurants" :key="`category_${category.categoryName}`">
            <h2 class="section-title">{{ category.categoryName || 'Burgers'}}</h2>
            <div v-if="category.restaurants.length" class="restaurant-wrapper">
                <router-link v-for="restaurant in category.restaurants" :key="restaurant.id"
                    :to="`/restaurant/${restaurant.id}`">
                    <RestaurantCard :restaurant="restaurant" @select="showRestaurantMenu" />
                </router-link>
            </div>
            <div v-else class="empty-state">No restaurants found in this area</div>
        </div> -->

<template>
    <div class="container home-container">
        <div class="conteiner app-header">
            <AppSearch @update:searchQuery="handleSearchChange" />
            <AppLocation @update:selectedLocation="handleLocationChange" :locations="cityStore.cities" />
        </div>

        <div class="section">
            <h2 class="section-title">{{ 'Burgers' }}</h2>
            <div class="restaurant-wrapper">
                <router-link v-for="restaurant in restaurantStore.restaurants" :key="restaurant.id"
                    :to="`/restaurant/${restaurant.id}`">
                    <RestaurantCard :restaurant="restaurant" @select="showRestaurantMenu" />
                </router-link>
            </div>
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
    console.log('restaurantStore:', restaurantStore.restaurants);

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
