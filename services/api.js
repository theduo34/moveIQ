import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // change to your deployed URL in production

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ── Request interceptor — attach JWT token to every request ──────────────────
api.interceptors.request.use((config) => {
  const { useAuthStore } = require("../store/auth/useAuthStore");
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor — handle 401 globally ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — log the user out
      const { useAuthStore } = require("../store/auth/useAuthStore");
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;