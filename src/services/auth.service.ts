import api from "./api";
import { User } from "../types/models";

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Em um ambiente real, descomentar a linha abaixo:
    // const response = await api.post<LoginResponse>('/auth/login', credentials);

    // Para fins de demonstração, simulamos uma resposta
    const mockResponse: LoginResponse = {
      token: "jwt-token-example",
      user: {
        id: "1",
        name: "Administrador",
        email: credentials.email,
        role: "admin",
      },
    };

    // Armazenar dados de autenticação
    localStorage.setItem("girowms_token", mockResponse.token);
    localStorage.setItem("girowms_user", JSON.stringify(mockResponse.user));

    return mockResponse;
  },

  logout(): void {
    // Em um ambiente real, poderíamos chamar um endpoint de logout
    // await api.post('/auth/logout');

    // Limpar dados do localStorage
    localStorage.removeItem("girowms_token");
    localStorage.removeItem("girowms_user");
  },

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem("girowms_user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("girowms_token");
  },
};
