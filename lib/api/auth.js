import api from "./axios";

export const authApi = {
  async register(data) {
    const response = await api.post("/auth/register", data);

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