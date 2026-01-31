import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.url?.includes("/auth/me")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post("/auth/login", credentials),

  getProfile: (token: string) =>
    api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const productsApi = {
  getAllProducts: (limit = 10, skip = 0) =>
    api.get(`/products?limit=${limit}&skip=${skip}`),

  getProduct: (id: number) => api.get(`/products/${id}`),

  searchProducts: (query: string) => api.get(`/products/search?q=${query}`),

  getCategories: () => api.get("/products/categories"),
};

export default api;
