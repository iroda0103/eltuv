<template>
  <div class="restaurant-card" @click="$emit('select', restaurant)">
    <div class="image-container">
      <!-- <img :src="restaurant.image || '../assets/placeholder.jpg'" :alt="restaurant.name" class="restaurant-image"> -->
      <img src="../assets/placeholder.jpg" :alt="restaurant.name" class="restaurant-image">
    </div>
    <div class="details">
      <h3 class="name">{{ restaurant.name }}</h3>
      <div class="info">
        <span class="cuisine">{{ restaurant.cuisine }}</span>
        <span class="rating">⭐ {{ restaurant.rating }}</span>
      </div>
      <div class="delivery-time">{{ restaurant.deliveryTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      restaurant: {
    type: Object,
    required: true
  }
  }
}
</script>

<style scoped>
.restaurant-card {
  border-radius: 12px;
  background: white;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
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
  margin-bottom: 8px;
  color: #666;
  font-size: 0.9rem;
}

.delivery-time {
  color: #2ecc71;
  font-weight: 500;
}

.restaurant-card {
  background: var(--card-bg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.name {
  color: var(--text-primary);
}

.cuisine, .rating {
  color: var(--text-secondary);
}
</style>