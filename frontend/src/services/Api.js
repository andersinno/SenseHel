import axios from 'axios';
import _ from 'lodash';

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
      return config;
    });
  }

  async login(username, password) {
    return this.api.post('login', {
      username,
      password
    });
  }

  async getAvailableServices() {
    return this.api.get('available-services');
  }

  async getSubscribedServices() {
    try {
      const res = await this.api.get('subscriptions');
      return _.map(res.data, 'service');
    } catch (e) {
      throw e;
    }
  }

  async getSubscribedServicesIds() {
    try {
      const res = await this.api.get('subscriptions');
      const subscriptions = res.data;

      return _.map(subscriptions, 'id');
    } catch (e) {
      throw e;
    }
  }
}

const API = new Api(URL);

export default API;
