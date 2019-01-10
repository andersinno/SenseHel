import axios from 'axios';
import LocalStorageKeys from '../config/LocalStorageKeys';

const URL = 'http://127.0.0.1:8000/api/';

class Api {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });
  }

  async setToken(token) {
    this.api.interceptors.request.use(config => {
      config.headers.post.Authorization = `Token ${token}`; // eslint-disable-line
      config.headers.get.Authorization = `Token ${token}`; // eslint-disable-line
      config.headers.delete.Authorization = `Token ${token}`; // eslint-disable-line

      return config;
    });
  }

  async login(username, password) {
    try {
      const res = await this.api.post('login', {
        username,
        password
      });

      localStorage.setItem(
        LocalStorageKeys.CURRENT_USER,
        JSON.stringify(res.data)
      );
      await this.setToken(res.data.token);
    } catch (e) {
      throw e;
    }
  }

  async getApartment() {
    try {
      const res = await this.api.get('apartments');
      return res.data[0];
    } catch (e) {
      throw e;
    }
  }

  async getAvailableServices() {
    return this.api.get('available-services');
  }

  async getSubscribedServices() {
    try {
      const res = await this.api.get('subscriptions');
      localStorage.setItem(
        LocalStorageKeys.SUBSCRIBED_SERVICES,
        JSON.stringify(res.data)
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  addSubscribedService(id) {
    return this.api.post('subscriptions/', {
      service: id
    });
  }

  deleteSubscribedService(id) {
    return this.api.delete(`subscriptions/${id}`);
  }
}

const API = new Api(URL);

export default API;
