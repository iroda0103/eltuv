import Client from './Client/AxiosClient';
const resource = '/cities';

export default {
  get() {
    return Client.get(`${resource}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  }
};