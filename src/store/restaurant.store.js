import { defineStore } from 'pinia'
import RestaurantRepository from '../repository/restaurant.repository'

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurants: [],
    categoryRestaurants: [],
    selectedRestaurant: null,
    searchResults: [],
    menu: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchRestaurants() {
      this.loading = true
      try {
        const response = await RestaurantRepository.get()
        const category_restaurant=await RestaurantRepository.getCategory()
        // this.restaurants = [{ id: 1, category: 'Burger', restaurants: response.data.data }]
        this.restaurants = response.data.data
        this.categoryRestaurants=category_restaurant.data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    // async fetchRestaurant(id) {
    //   this.loading = true
    //   try {
    //     const response = await RestaurantRepository.getRestaurant(id)
    //     this.selectedRestaurant = response.data
    //     this.menu = await RestaurantRepository.getRestaurantMenu(id)
    //     this.menu= response.data.menu || []
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // },
    async fetchRestaurant(id) {
      this.loading = true;
      try {
        const response = await RestaurantRepository.getRestaurant(id);

        // Eski va yangi ma'lumotlarni solishtirish
        // if (!isEqual(this.selectedRestaurant, response.data)) {
        this.selectedRestaurant = response.data;
        // }

        const menuResponse = await RestaurantRepository.getRestaurantMenu(id);
        console.log("Menu Response:", menuResponse);

        // // Menu uchun chuqur solishtirish
        // if (!isEqual(this.menu, menuResponse.data)) {
        this.menu = menuResponse;
        // }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async createRestaurant(payload) {
      this.loading = true
      try {
        const response = await RestaurantRepository.create(payload)
        this.restaurants.push(response.data) // yangi restoran ro‘yxatga qo‘shiladi
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async searchRestaurant(query) {
      this.loading = true
      let queryString = ''
      try {
        if (query.q) {
          queryString = `search=${query.q}`
        }
        if (query.cityFilter) {
          queryString += `&cityFilter=${query.cityFilter}`
        }
        const response = await RestaurantRepository.searchRestaurant(queryString)
        const category_restaurant = await RestaurantRepository.getCategory(queryString)
        this.restaurants = response.data.data
        this.categoryRestaurants = category_restaurant.data.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
    ,
    deleteStore(){
      this.restaurants=[]
      this.menu=[]
    }
  }
})
