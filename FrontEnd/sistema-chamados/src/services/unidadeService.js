import api from './api'; // Importamos nossa instância configurada do axios

// O endpoint específico para unidades
const ENDPOINT = '/unidades';

// Função para buscar todas as unidades
export const getAllUnidades = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

// Função para criar uma nova unidade
export const createUnidade = async (unidadeData) => {
  const response = await api.post(ENDPOINT, unidadeData);
  return response.data;
};

// Função para atualizar uma unidade existente
export const updateUnidade = async (id, unidadeData) => {
  const response = await api.put(`${ENDPOINT}/${id}`, unidadeData);
  return response.data;
};

// Função para deletar uma unidade
export const deleteUnidade = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};