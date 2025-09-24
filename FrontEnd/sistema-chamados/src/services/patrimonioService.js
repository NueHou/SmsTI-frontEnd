import api from './api'; // Importamos nossa instância configurada do axios

// O endpoint específico para patrimônios
const ENDPOINT = '/patrimonios';

// Função para buscar todos os patrimônios
export const getAllPatrimonios = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

// Função para criar um novo patrimônio
export const createPatrimonio = async (patrimonioData) => {
  const response = await api.post(ENDPOINT, patrimonioData);
  return response.data;
};

// Função para atualizar um patrimônio existente
export const updatePatrimonio = async (id, patrimonioData) => {
  const response = await api.put(`${ENDPOINT}/${id}`, patrimonioData);
  return response.data;
};

// Função para deletar um patrimônio
export const deletePatrimonio = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
};