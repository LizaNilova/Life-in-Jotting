import axios from 'axios';

// Проверим в самом начале, есть ли токен в хранилище
const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://l7h1p7rb-5000.euw.devtunnels.ms'
// Создать инстанс axios
const $api = axios.create({
  baseURL: `${BASE_URL}/life-in-jotting`,
  withCredentials: true,
});

$api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        await axios.get(`${BASE_URL}/life-in-jotting/auth/refresh`, {
          withCredentials: true,
        });
        return $api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
  }
);

export default $api;
