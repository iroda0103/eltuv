import Client from './Client/AxiosClient';
import Client2 from './Client/AxiosClient2';
const resource = '/orders';

export default {
  get(id) {
    return Client.get(`${resource}/${id}`);
  },
  getOrder(id) {
    return Client.get(`${resource}/my-orders/${id}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  editOrder(id, payload) {
    return Client.patch(`${resource}/${id}`, payload);
  },
  createdOrder(payload) {
    return Client2.post(`${resource}/created-order`, payload);
  }
};