<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ restaurant.name }}</h2>
                <button @click="$emit('close')" class="close-btn">&times;</button>
            </div>

            <div class="menu-container">
                <div v-for="item in restaurant.menu" :key="item.id" class="menu-item"
                    @click="$emit('add-to-cart', item)">
                    <div class="item-info">
                        <h3 class="item-name">{{ item.name }}</h3>
                        <p class="item-desc">{{ item.description }}</p>
                        <span class="item-price">{{ formatPrice(item.price) }} UZS</span>
                    </div>
                    <div class="item-image">
                        <img :src="item.image || 'placeholder.jpg'" alt="Food item">
                    </div>
                </div>
            </div>
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
    },
    methods: {
        formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
    },
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    background: white;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.menu-container {
    padding: 16px;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
}

.item-info {
    flex: 1;
}

.item-name {
    margin: 0 0 8px;
    font-size: 1.1rem;
}

.item-desc {
    margin: 0 0 8px;
    color: #666;
    font-size: 0.9rem;
}

.item-price {
    font-weight: bold;
    color: #e74c3c;
}

.item-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
}

.item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background: var(--card-bg);
  color: var(--text-primary);
}

.modal-header {
  border-bottom: 1px solid var(--border-color);
}

.menu-item {
  border-bottom: 1px solid var(--border-color);
}

.item-name {
  color: var(--text-primary);
}

.item-desc {
  color: var(--text-secondary);
}
</style>