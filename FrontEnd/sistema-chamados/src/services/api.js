import axios from 'axios';
import { getToken } from './authService';

// Cria uma instância do axios com a URL base da nossa API
const api = axios.create({
  baseURL: 'http://172.17.5.59:8080/api',
});

// "Interceptor" de requisições:
// Antes de cada requisição ser enviada, este código é executado.
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Pega o token do localStorage
    if (token) {
      // Se o token existir, adiciona o cabeçalho Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Retorna a configuração da requisição modificada
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;