import axios from "axios";
const AxiosAut = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});

// تحديث التوكن دائمًا قبل كل طلب
AxiosAut.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosAut;
