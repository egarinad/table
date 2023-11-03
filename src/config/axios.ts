import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://api.tanki.su/wot/encyclopedia/vehicles/?application_id=${import.meta.env.VITE_APPLICATION_ID}`,
});

axiosInstance.interceptors.request.use(request => request);
axiosInstance.interceptors.response.use(
  response => response,
  response => Promise.reject(response)
);

export { axiosInstance };
