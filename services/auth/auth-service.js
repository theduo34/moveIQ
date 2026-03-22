import { sendPasswordResetEmail } from "firebase/auth";
import api from "../api";
import { auth } from "../firebase";

export const authService = {
  login: async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data; // expects { user, token }
  },

  register: async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  getMe: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },

  refreshToken: async (refreshToken) => {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    return data;
  },

  resetPassword: async (email) => {
  return await sendPasswordResetEmail(auth, email);
  },
};