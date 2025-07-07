<template>
    <div class="modal-overlay">
        <div class="menu-modal">
            <div class="menu-header">
                <button @click="goBack" class="menu-toggle-btn"><font-awesome-icon
                        :icon="['fas', 'arrow-left']" /></button>
                <h1 class="restaurant__name" :class="{ 'show-element': showElement }">{{ }}</h1>

                <!-- <button class="menu-toggle-btn" @click="changeVisibility">
        🛒 {{ formatPrice(totalPrice) }} sum
      </button> -->
                <div class="savat-header" v-if="menuStore.restaurant">
                    <h3>{{ menuStore.restaurant.name }}</h3>
                    <p> {{ menuStore.restaurant.deliveryTime }}</p>
                </div>
                <button class="menu-toggle-btn" @click="clearMenu()">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
            </div>


            <div v-if="menu.length === 0" class="empty-cart">
                <p>Корзина пуста</p>
            </div>

            <div v-else>
                <div v-for="item in items" :key="item.id" class="modal-item">
                    <div class="modal-item__wrapper">
                        <img v-if="item.id === 1" src="../assets/shefburger.jpg" alt="item" class="menu-img" />
                        <img v-if="item.id === 2" src="../assets/mixBurger.jpg" alt="item" class="menu-img" />
                        <div class="modal-menu--info">
                            <p class="item-name">{{ item.name }}</p>
                            <p class="item-meta">{{ formatPrice(item.price) }} sum </p>
                            <p class="item-meta">{{ item.weight }}</p>
                        </div>
                    </div>

                    <div class="menu-actions">
                        <button @click="removeFromMenu(item)">−</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="addToMenu(item)">+</button>
                    </div>
                </div>

                <hr class="divider" />

                <!-- <div class="summary">
                    <p>Service fee: <strong>5,000 sum</strong></p>
                    <p>Delivery: <strong>4,999 sum</strong></p>
                </div> -->
                

                <button class="checkout-btn" @click="next">
                    Next {{ formatPrice(totalPrice + 9999) }} sum
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useMenuStore } from '../store/menu.store';
export default {
    name: "SavatPage",
    data() {
        return {
            menu: [
                { id: 101, name: "Osh", price: 35000, description: "Traditional Uzbek Plov", quantity: 0, weight: "400g" },
                { id: 102, name: "To'y oshi", price: 25000, description: "Traditional Uzbek Plov", quantity: 0, weight: "400g" },
                { id: 103, name: "Samarqand oshi", price: 25000, description: "Traditional Uzbek Plov", quantity: 0, weight: "400g" }
            ]
        };
    },
    setup() {
        const menuStore = useMenuStore()
        console.log('menuStore', menuStore.menu);

        return {
            menuStore
        }
    },
    computed: {
        totalPrice() {
            return this.menuStore.totalPrice
        },
        items() {
            return this.menuStore.menu
        },
    },
    methods: {
        formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
        clearMenu() {
            this.menuStore.clearMenu()
        },
        addToMenu(item) {
            this.menuStore.addToMenu(item)
        },
        removeFromMenu(item) {
            this.menuStore.removeFromMenu(item)
        },
        goBack() {
            this.$router.go(-1);
        },
        next() {
            if (this.menuStore.menu.length === 0) {
                alert("Корзина пустая");
                return;
            }
            this.$router.push({ name: 'CheckoutDelivery', path: '/checkout-delivery' });
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    /* position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh; */
    /* background: rgba(0, 0, 0, 0.5); */
    display: flex;
    justify-content: center;
    align-items: center;
    /* z-index: 1000; */
    padding: 10px;
}

.menu-modal {
    /* background: #fff; */
    /* background: var(--card-bg); */
    /* border-radius: 16px; */
    padding: 24px;
    width: 100%;
    /* max-width: 420px; */
    /* max-height: 90vh; */
    /* overflow-y: auto; */
    /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); */
    position: relative;
    padding-top: 60px;
}

.menu-header {
    padding-top: 15px;
}

.savat-header {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.savat-header p {
    font-size: 12px;
    color: var(--text-secondary);
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

.summary p {
    /* margin: 7px 0; */
    padding: 15px 0;
    border-bottom: 1px solid #eee;
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
