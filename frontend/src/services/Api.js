import axios from 'axios';

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
    const res = await this.api.post('login', {
      username,
      password
    });

    return res;
  }

  async getAvailableServices() {
    const res = await this.api.get('available-services');

    return res;
  }
}

const API = new Api(URL);

export default API;
