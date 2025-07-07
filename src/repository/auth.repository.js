import Client from './Clients/AxiosClient';

export default class AuthRepository {
  static login(credentials) {
    console.log('START FRONTENG AUTH',credentials);
    
    return Client.post('/users/login', credentials);
  }

  static register(userData) {
    return Client.post('/register', userData);
  }

  static logout() {
    return Client.post('/logout');
  }

  static getProfile() {
    return Client.get('/me');
  }

  static refreshToken() {
    return Client.post('/refresh');
  }
}