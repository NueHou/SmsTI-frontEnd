import api from './api'; // Importamos nossa instância configurada do axios

// O endpoint específico para usuários
const ENDPOINT = 'api/users';

// Função para buscar todos os usuários
export const getAllUsuarios = async () => {
  const response = await api.get(`${ENDPOINT}/listar`);
  return response.data;
};

// Função para criar um novo usuário
export const createUsuario = async (usuarioData) => {
  const response = await api.post(ENDPOINT, usuarioData);
  return response.data;
};

// Função para atualizar um usuário existente
export const updateUsuario = async (id, usuarioData) => {
  const response = await api.put(`${ENDPOINT}/${id}`, usuarioData);
  return response.data;
};

// Função para deletar um usuário
export const deleteUsuario = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};