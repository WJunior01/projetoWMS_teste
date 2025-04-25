import axios from "axios";

// Configuração base do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionar interceptor para injetar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("girowms_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Verificar se é erro de autenticação (401)
    if (error.response && error.response.status === 401) {
      // Limpar dados de autenticação e redirecionar para login
      localStorage.removeItem("girowms_user");
      localStorage.removeItem("girowms_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
