import api from "./axios";

export const teachersApi = {
  async list(params = {}) {
    const response = await api.get("/teachers", {
      params,
    });

    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/teachers/${id}`);

    return response.data;
  },

  async create(data) {
    const response = await api.post("/teachers", data);

    return response.data;
  },

  async update(id, data) {
    const response = await api.patch(`/teachers/${id}`, data);

    return response.data;
  },

  async remove(id) {
    const response = await api.delete(`/teachers/${id}`);

    return response.data;
  },
};