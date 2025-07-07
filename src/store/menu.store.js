import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: [],
    restaurant: null
  }),
  getters: {
    totalPrice(state) {
      return state.menu.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    getQuantity: (state) => (id) => {
      const found = state.menu.find(i => i.id === id);
      return found ? found.quantity : 0;
    }
  },
  actions: {
    setRestaurant(restaurant) {
      this.restaurant = restaurant;
    },
    addToMenu(item) {
      const existing = this.menu.find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.menu.push({ ...item, quantity: 1 });
      }
    },
    removeFromMenu(item) {
      const existing = this.menu.find(i => i.id === item.id);
      if (existing.quantity > 1) {
        existing.quantity--;
      } else {
        this.menu = this.menu.filter(i => i.id !== item.id);
      }
    },
    clearMenu() {
      this.menu = [];
      this.restaurant = null;
    }
  }
});
