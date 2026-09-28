import api from "./axios";

export const rolesApi = {
  async list(params = {}) {
    const response = await api.get("/roles", {
      params,
    });

    return response.data;
  },
}