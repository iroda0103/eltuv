import axios from "axios";

// const baseDomain = "http://localhost:3002/";
const baseDomain = "https://dastavka.onrender.com";
const baseURL = `${baseDomain}`; 

const Client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});


Client.interceptors.request.use((config) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzUwNjgyNDUwLCJleHAiOjE3NTMyNzQ0NTB9.TlWl_7jazGT7pgDE6cIAIpMPbUhT6LqUs1rkwhVmELk';
  // if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

Client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      // window.location.reload(); // Logout qilish
    }
    return Promise.reject(error);
  }
);

console.log(localStorage.getItem);

export default Client
