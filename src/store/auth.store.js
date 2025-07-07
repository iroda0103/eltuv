import { defineStore } from 'pinia';
import AuthRepository from '../repositories/auth.repository';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  }),
  
  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data } = await AuthRepository.login(credentials);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData) {
      // Registratsiya logikasi...
    },

    async logout() {
      await AuthRepository.logout();
      this.resetAuth();
    },

    async fetchProfile() {
      const { data } = await AuthRepository.getProfile();
      this.user = data;
    },

    resetAuth() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  }
});