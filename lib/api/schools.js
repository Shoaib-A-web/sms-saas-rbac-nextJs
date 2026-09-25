import api from "./axios";

export const schoolsApi = {
  async list(params = {}) {
    const response = await api.get("/schools", {
      params,
    });

    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/schools/${id}`);

    return response.data;
  },

  async create(data) {
    const response = await api.post("/schools", data);

    return response.data;
  },

  async update(id, data) {
    const response = await api.patch(`/schools/${id}`, data);

    return response.data;
  },

  async remove(id) {
    const response = await api.delete(`/schools/${id}`);

    return response.data;
  },
};