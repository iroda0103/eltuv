import Client from './Client/AxiosClient';
const resource = '/users';

export default {
    get(query) {
        return Client.get(`${resource}?${query}`);
    },
    getUser(id) {
        return Client.get(`${resource}/${id}`);
    },
    create(payload) {
        return Client.post(`${resource}`, payload);
    },
    update(payload, id) {
        return Client.patch(`${resource}/${id}`, payload);
    },
    delete(id) {
        return Client.delete(`${resource}/${id}`)
    },
    // AUTH
    login(credentials) {
        console.log('START FRONTENG AUTH', credentials);

        return Client.post(`${resource}/login`, credentials);
    },
    logout() {
        return Client.post('/logout');
    },
    getProfile() {
        return Client.get(`${resource}/me`);
    }
};