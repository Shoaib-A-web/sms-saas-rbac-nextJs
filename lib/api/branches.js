import api from "./axios";

export const branchesApi = {
  async list(params = {}) {
    const response = await api.get("/branches", {
      params,
    });

    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/branches/${id}`);

    return response.data;
  },

  async create(data) {
    const response = await api.post("/branches", data);

    return response.data;
  },

  async update(id, data) {
    const response = await api.patch(`/branches/${id}`, data);

    return response.data;
  },

  async remove(id) {
    const response = await api.delete(`/branches/${id}`);

    return response.data;
  },
};