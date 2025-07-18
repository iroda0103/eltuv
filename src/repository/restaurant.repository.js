import Client from './Client/AxiosClient';
const resource = '/restaurants';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getCategory(query){
    return Client.get(`${resource}/category/group/?${query}`)
  },
  getRestaurant(id) {
    return Client.get(`${resource}/${id}`);
  },
  // async getRestaurantMenu(id) {
  //   const response = await Client.get(`menu/restaurant/${id}`);
  //   return response.data;
  // },
  async getRestaurantMenu(id) {
    try {
      const response = await Client.get(`menu/restaurant/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
      throw error; // Xatolikni tashlash
    }
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },

  searchRestaurant(query) {
    return Client.get(`${resource}/?${query}`);
  }
};