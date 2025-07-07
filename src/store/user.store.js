import { defineStore } from 'pinia';
import UserRepository from '../repository/users.repository.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    users: [],
    loading: false,
    error: null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    getUsers: (state) => state.users
  },
  
  actions: {
    // Set loading state
    setLoading(status) {
      this.loading = status;
    },
    
    // Set error state
    setError(error) {
      this.error = error;
    },
    
    // Reset error
    resetError() {
      this.error = null;
    },
    
    // Fetch all users
    async fetchUsers(query) {
      try {
        let new_query ='';
        this.setLoading(true);
        this.resetError();
        if(query.telegramId){
          new_query ='telegramId=' + query.telegramId;
        }
        const response = await UserRepository.get(new_query);
        this.users = response.data;
        if(query.telegramId){
          this.user = response.data[0] || null; // Set user if telegramId is provided
        }
        return response;
      } catch (error) {
        this.setError(error.message || 'Foydalanuvchilarni yuklashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Fetch single user
    async fetchUser(id) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.getUser(id);
        return response.data;
      } catch (error) {
        this.setError(error.message || 'Foyd  alanuvchi ma\'lumotlarini yuklashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Create user
    async createUser(userData) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.create(userData);
        // Optional: Refresh users list after creating
        await this.fetchUsers();
        return response;
      } catch (error) {
        this.setError(error.message || 'Foydalanuvchi yaratishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Update user
    async updateUser(userData, id) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.update(userData, id);
        // If updating current user, update local user object
        if (this.user && this.user.id === id) {
          this.user = { ...this.user, ...userData };
        }
        // Refresh users list
        await this.fetchUsers();
        return response;
      } catch (error) {
        this.setError(error.message || 'Foydalanuvchini yangilashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Delete user
    async deleteUser(id) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.delete(id);
        // Refresh users list
        await this.fetchUsers();
        return response;
      } catch (error) {
        this.setError(error.message || 'Foydalanuvchini o\'chirishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Login user
    async login(credentials) {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.login(credentials);
        // Save user information after successful login
        // await this.fetchProfile();
        localStorage.setItem("token",response.data.data.token);
        localStorage.setItem("role",response.data.data.role);
        console.log('TOKEN',localStorage.getItem("token"));
        
        return response;
      } catch (error) {
        this.setError(error.message || 'Tizimga kirishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Fetch user profile
    async fetchProfile() {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.getProfile();
        this.user = response.data;
        return response;
      } catch (error) {
        this.setError(error.message || 'Profil ma\'lumotlarini yuklashda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Logout user
    async logout() {
      try {
        this.setLoading(true);
        this.resetError();
        const response = await UserRepository.logout();
        // Clear user data after logout
        this.user = null;
        return response;
      } catch (error) {
        this.setError(error.message || 'Tizimdan chiqishda xatolik');
        throw error;
      } finally {
        this.setLoading(false);
      }
    }
  }
});