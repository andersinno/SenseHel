import axios from 'axios';

const URL = 'http://172.19.0.3:8000/api/';

class Api {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });
  }

  async login(username, password) {
    const res = await this.api.post('login', {
      username,
      password
    });

    console.log(res);

    if (res.status === 200) {
      return res;
    }

    throw new Error(`Login failed with status ${res.status}, error: ${res}`);
  }
}

const API = new Api(URL);

export default API;
