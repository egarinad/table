import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.tanki.su/wot/encyclopedia/vehicles/?application_id=2b0adae8aa6efcbaf9abba08c10e8a3d',
});

axiosInstance.interceptors.request.use(request => request);
axiosInstance.interceptors.response.use(
  response => response,
  response => Promise.reject(response)
);

export { axiosInstance };
