<template>
  <div class="restaurant-card" @click="$emit('select', restaurant)">
    <div class="image-container">
      <img :src="`https://api.suvtekin.uz/${restaurant.image}`" :alt="restaurant.name" class="restaurant-image">
      <!-- <img v-if="restaurant.id == 2" src="../assets/burger.webp" :alt="restaurant.name" class="restaurant-image"> -->
      <!-- <img v-if="restaurant.id == 1" src="../assets/burger2.jpg" :alt="restaurant.name" class="restaurant-image"> -->
      <!-- <img src="../assets/placeholder.jpg" :alt="restaurant.name" class="restaurant-image"> -->
    </div>
    <div class="details">
      <!-- <h3 class="name">{{ restaurant.name }}</h3> -->

      <div class="info">
        <h3 class="name">{{ restaurant.name }}</h3>
        <!-- <span class="cuisine">{{ restaurant.cuisine }}</span> -->
        <!-- <span class="rating">⭐ {{ restaurant.rating }}</span> -->
        <span class="rating"> <font-awesome-icon :icon="['fas', 'star']" /> {{ restaurant.rating || '4.8' }}</span>
      </div>
      <div class="delivery-time"> <font-awesome-icon class="search-icon" :icon="['fas', 'car']" />
        {{ restaurant.deliveryTime || '20-30 min' }}</div>
      <span class="bonus">Yetkazib berish tekin</span>
    </div>
  </div>
</template>

<script>

// import { faStar } from '@fortawesome/free-regular-svg-icons/faStar'
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },


}
</script>

<style scoped>
.restaurant-card {
  flex: 0 0 auto;
  border-radius: 12px;
  background: white;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  scroll-snap-align: 20px;
  width: 270px;
}

.image-container {
  height: 140px;
}

.restaurant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  padding: 12px;
}

.name {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.info {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 8px; */
  color: #666;
  font-size: 0.9rem;
}

.delivery-time {
  /* color: #2ecc71;
  font-weight: 500; */
  font-size: 14px;
  color: var(--text-primary);
}

.restaurant-card {
  background: var(--card-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.name {
  color: var(--text-primary);
}

.cuisine,
.rating {
  color: var(--text-primary);
}

.bonus {
  font-size: 12px;
  color: rgba(61, 174, 27, 0.95);
  background-color: rgba(166, 251, 166, 0.88);
  padding: 5px 10px;
  border-radius: 12px;
  margin-top: 5px;
  display: inline-block;
  font-weight: bold;
}
</style>