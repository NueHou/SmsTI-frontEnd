import api from './api'; // Importamos nossa instância configurada do axios

// O endpoint específico para chamados
const ENDPOINT = '/chamados';

// Função para buscar todos os chamados
export const getAllChamados = async () => {
  const response = await api.get(`${ENDPOINT}/listar`);
  return response.data;
};

// Função para buscar um chamado específico pelo ID
export const getChamadoById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
};

// Função para criar um novo chamado
export const createChamado = async (chamadoData) => {
  const response = await api.post(`${ENDPOINT}/cadastrar`, chamadoData);
  return response.data;
};

// Função para atualizar um chamado existente
export const updateChamado = async (id, chamadoData) => {
  const response = await api.put(`${ENDPOINT}/alterar/${id}`, chamadoData);
  return response.data;
};

// Função para deletar um chamado
export const deleteChamado = async (id) => {
  const response = await api.delete(`${ENDPOINT}/deletar/${id}`);
  return response.data;
};