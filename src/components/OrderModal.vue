<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="menu-modal">
            <div class="modal-header">
                <h2>🛒 Корзина</h2>
                <button class="clear-btn" @click="$emit('clear-menu')">Очистить</button>
            </div>

            <div v-if="menu.length === 0" class="empty-cart">
                <p>Корзина пуста</p>
            </div>

            <div v-else>
                <div v-for="item in menu" :key="item.id" class="modal-item">
                    <div class="modal-item__wrapper"><img src="../assets/food.jpeg" alt="item" class="menu-img" />
                        <div class="modal-menu--info">
                            <p class="item-name">{{ item.name }}</p>
                            <p class="item-meta">{{ formatPrice(item.price) }} sum </p>
                            <p class="item-meta">{{ item.weight }}</p>
                        </div>
                    </div>

                    <div class="menu-actions">
                        <button @click="$emit('remove-from-menu', item)">−</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="$emit('add-to-menu', item)">+</button>
                    </div>
                </div>

                <hr class="divider" />

                <!-- <div class="summary">
                    <p>Service fee: <strong>5,000 sum</strong></p>
                    <p>Delivery: <strong>4,999 sum</strong></p>
                </div> -->

                <button class="checkout-btn" @click="$emit('clear-menu')"> 
                    Next {{ formatPrice(totalPrice + 9999) }} sum
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderModal",
    props: {
        menu: {
            type: Array,
            default: () => []
            // required: true
        }
    },
    computed: {
        totalPrice() {
            return this.menu.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
    },
    methods: {
        formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 10px;
}

.menu-modal {
    /* background: #fff; */
    background: var(--card-bg);
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 420px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.clear-btn {
    background: none;
    border: none;
    color: #d9534f;
    font-weight: bold;
    cursor: pointer;
}

.empty-cart {
    text-align: center;
    margin-top: 40px;
    font-size: 1.1rem;
    color: #888;
}

.modal-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    justify-content: space-between;
}

.menu-img {
    width: 100px;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 12px;
}

.modal-menu--info {
    flex: 1;
}

.item-name {
    font-weight: bold;
    margin: 0;
}

.item-meta {
    font-size: 0.9rem;
    /* color: #666; */
    color: var(--text-secondary);
}

.menu-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.menu-actions button {
    background: #f0f0f0;
    border: none;
    padding: 4px 10px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
}

.divider {
    margin: 16px 0;
    border: none;
    border-top: 1px solid #eee;
}

.summary {
    font-size: 0.95rem;
    /* color: #333; */
    color: var(--text-primary);
    margin-bottom: 16px;
}

.checkout-btn {
    background: #ffc107;
    color: #000;
    font-weight: bold;
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.checkout-btn:hover {
    background: #ffca2c;
}

.modal-item__wrapper {
    display: flex;
    justify-content: space-between;
}
</style>
