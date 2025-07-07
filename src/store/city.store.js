import { defineStore } from 'pinia'
import CityRepository from '../repository/city.repository.js'

export const useCityStore = defineStore('city', {
  state: () => ({
    cities: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCities() {
      this.loading = true
      try {
        const response = await CityRepository.get()
        this.cities = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async addCity(payload) {
      this.loading = true
      try {
        const response = await CityRepository.create(payload)
        this.cities.push(response.data) // yangi shaharni ro'yxatga qo‘shish
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
