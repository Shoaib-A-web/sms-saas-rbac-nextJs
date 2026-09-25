import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        type: "api",
        status: error.response.status,
        code:
          error.response.data?.error?.code ||
          "API_ERROR",
        message:
          error.response.data?.error?.message ||
          "Something went wrong.",
      });
    }

    if (error.request) {
      return Promise.reject({
        type: "network",
        status: null,
        code: "NETWORK_ERROR",
        message: "Unable to connect to the server.",
      });
    }

    return Promise.reject({
      type: "client",
      status: null,
      code: "CLIENT_ERROR",
      message: error.message || "Something went wrong.",
    });
  }
);

export default api;