import axios from 'axios';
import _ from 'lodash';
import LocalStorageKeys from '../config/LocalStorageKeys';

const URL = 'http://127.0.0.1:8000/api/';

class Api {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });

    this.api.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response.status === 401) {
          localStorage.clear();

          // Hacky-ish and ugly but works and quick
          window.alert('You have been logged out due to inactivity');
          window.location = '/login';
        }
        throw error;
      }
    );
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
      const res = await this.api.post('login/', {
        username,
        password
      });

      localStorage.setItem(LocalStorageKeys.CURRENT_USER, JSON.stringify(res));
      await this.setToken((res || { token: '' }).token);
    } catch (e) {
      if (e.response.status === 400) {
        throw new Error('Incorrect username or password');
      }
      throw e;
    }
  }

  async getApartment() {
    try {
      const res = await this.api.get('apartments');
      return res[0];
    } catch (e) {
      throw e;
    }
  }

  async getAvailableServices() {
    return this.api.get('services/');
  }

  async getSubscribedServices() {
    try {
      const res = await this.api.get('subscriptions/');
      localStorage.setItem(
        LocalStorageKeys.SUBSCRIBED_SERVICES,
        JSON.stringify(res)
      );

      return res;
    } catch (e) {
      throw e;
    }
  }

  addSubscribedService(id, url, permissions) {
    return this.api.post('subscriptions/', {
      service: id,
      service_url: url,
      permission:permissions,
    });
  }

  deleteSubscribedService(id) {
    return this.api.delete(`subscriptions/${id}/`);
  }

  async getApartmentSensors() {
    try {
      const res = await this.api.get('sensors/');
      return res
    } catch (e) {
      throw e;
    }
  }

  revokeApartment() {
    const currentUser = JSON.parse(
      localStorage.getItem(LocalStorageKeys.CURRENT_USER)
    );
    const ID = currentUser && currentUser.id;
    if (ID) return this.api.delete(`users/${ID}/`);

    throw new Error('User not logged in!');
  }

  updateDatastreamPermissions(permissionData) {
    return this.api.post('subscriptions/update_datastream_permission/', {
      permission_data: permissionData
    });
  }
}

const API = new Api(URL);

export default API;
