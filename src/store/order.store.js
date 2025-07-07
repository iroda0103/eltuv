// import { defineStore } from 'pinia'
// import OrderRepository from '../repository/order.repository.js';

// export const useOrderStore = defineStore('order', {
//   state: () => ({
//     orders: [],
//     order:{}
//   }),
//   getters: {
//     getQuantity: (state) => (id) => {
//       const found = state.menu.find(i => i.id === id);
//       return found ? found.quantity : 0;
//     }
//   },
//   actions: {
//     setOrder(order) {
//       this.order = order;
//     },
//     setOrders(orders) {
//       this.orders = orders;
//     },
//     addToOrder(item){

//     },
//     addToMenu(item) {
//       const existing = this.menu.find(i => i.id === item.id);
//       if (existing) {
//         existing.quantity++;
//       } else {
//         this.menu.push({ ...item, quantity: 1 });
//       }
//     },
//     removeFromMenu(item) {
//       const existing = this.menu.find(i => i.id === item.id);
//       if (existing.quantity > 1) {
//         existing.quantity--;
//       } else {
//         this.menu = this.menu.filter(i => i.id !== item.id);
//       }
//     },
//     clearMenu() {
//       this.menu = [];
//       this.restaurant = null;
//     }
//   }
// });
import { defineStore } from 'pinia';
import OrderRepository from '../repository/order.repository.js'; import { ref } from 'vue';
export const useOrderStore = defineStore('order', () => {
  const order = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Create order
  async function createOrder(payload) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await OrderRepository.create(payload);
      order.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data || err.message;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  // Create order
  async function createOrderToDelivery(payload) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await OrderRepository.createdOrder(payload);
      return response
    } catch (err) {
      error.value = err.response?.data || err.message;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  // Get order by ID
  async function getOrder(id) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await OrderRepository.getOrder(id);
      order.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data || err.message;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }       

  // Edit existing order
  async function editOrder(id, payload) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await OrderRepository.editOrder(id, payload);
      order.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data || err.message;
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    order,
    isLoading,
    error,
    createOrder,
    getOrder,
    editOrder,
    createOrderToDelivery
  };
});
