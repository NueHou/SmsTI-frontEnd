// O endpoint de login do seu back-end Spring Security
const API_URL = 'http://172.17.5.53:8080/api/auth/login';

// Função de Login
export const login = async (credentials) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials), // ex: { email: 'user@example.com', senha: '123' }
  });

  if (!response.ok) {
    throw new Error('Falha na autenticação: Verifique suas credenciais.');
  }

  const data = await response.json();

  // Se o back-end retornar o token dentro de um objeto (ex: { token: "..." })
  if (data.token) {
    // Salva o token no localStorage
    localStorage.setItem('userToken', data.token);
  }

  return data;
};

// Função de Logout
export const logout = () => {
  localStorage.removeItem('userToken');
};

// Função para pegar o token salvo
export const getToken = () => {
  return localStorage.getItem('userToken');
};