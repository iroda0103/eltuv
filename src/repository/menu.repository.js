import Client from './Clients/AxiosClient';
const resource = '/menu';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  getMenu(id) {
    return Client.get(`${resource}/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },

  searchMenu(query) {
    return Client.get(`${resource}/search?q=${query}`);
  }
};