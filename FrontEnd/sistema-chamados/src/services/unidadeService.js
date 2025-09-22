// A URL base da sua API para o endpoint de unidades
const API_URL = 'http://localhost:8080/api/unidades';

// Buscar todas as unidades
export const getAllUnidades = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar unidades.');
  }
  return response.json();
};

// Criar uma nova unidade
export const createUnidade = async (unidadeData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(unidadeData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar unidade.');
  }
  return response.json();
};

// Atualizar uma unidade existente
export const updateUnidade = async (id, unidadeData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unidadeData),
    });
    if (!response.ok) {
        throw new Error('Erro ao atualizar unidade.');
    }
    return response.json();
};

// Deletar uma unidade
export const deleteUnidade = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao deletar unidade.');
    }
};