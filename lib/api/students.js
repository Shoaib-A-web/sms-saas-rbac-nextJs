import api from "./axios";

import { students } from "../fakeDb/students";

export const studentsApi = {

  async list(params = {}) {
    const response = await api.get("/students", {params,});

    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/students/${id}`);

    return response.data;
  },

  async create(data) {
    const response = await api.post("/students", data);

    return response.data;
  },

  async update(id, data) {
    const response = await api.patch(`/students/${id}`, data);

    return response.data;
  },

  async remove(id) {
    const response = await api.delete(`/students/${id}`);

    return response.data;
  },
};