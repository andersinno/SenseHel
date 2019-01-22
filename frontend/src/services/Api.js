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
          localStorage.removeItem(LocalStorageKeys.CURRENT_USER);
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
      const res = await this.api.post('login', {
        username,
        password
      });

      localStorage.setItem(LocalStorageKeys.CURRENT_USER, JSON.stringify(res));
      await this.setToken((res || { token: '' }).token);
    } catch (e) {
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
    return this.api.get('available-services');
  }

  async getSubscribedServices() {
    try {
      const res = await this.api.get('subscriptions');
      localStorage.setItem(
        LocalStorageKeys.SUBSCRIBED_SERVICES,
        JSON.stringify(res)
      );

      return res;
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

  async getApartmentSensors() {
    try {
      const res = await this.api.get('apartmentsensors');

      const apartmentSensors = _.reduce(
        res,
        (sensors, a) => {
          const s = _.map(
            a.apartment_sensor_values,
            ({ description, uri, ui_type: uiType }) => ({
              id: `${a.id}-${description.substr(0, 5)}`,
              name: a.description,
              identifier: a.identifier,
              uri,
              description,
              uiType
            })
          );

          return _.concat(sensors, s);
        },
        []
      );

      return apartmentSensors;
    } catch (e) {
      throw e;
    }
  }
}

const API = new Api(URL);

export default API;
