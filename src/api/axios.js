import axios from "axios";

const API = axios.create({
  baseURL: "https://voting-app-server-d769.onrender.com/api", 
});


API.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;


