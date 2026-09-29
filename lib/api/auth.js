import api from "./axios";

export const authApi = {

  async login(data) {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  async logout() {
    const response = await api.post("/auth/logout");

    return response.message;
  },

  async register(data) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async saRegister(data) {
    const response = await api.post("/auth/saRegister", data);
    return response.data;
  },

  async forgotPassword(data) {
    const response = await api.post(
      "/auth/forgot-password",
      data
    );

    return response.data;
  },

  async resetPassword(data) {
    const response = await api.post(
      "/auth/reset-password",
      data
    );

    return response.data;
  },
};