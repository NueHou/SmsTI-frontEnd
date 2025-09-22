// A URL base da sua API. Verifique se a porta (ex: 8080) está correta.
const API_URL = 'http://192.168.0.18:8080/usuarios';

// Função para buscar todos os usuários
export const getAllUsuarios = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários.');
  }
  return response.json();
};

// Função para criar um novo usuário
export const createUsuario = async (usuarioData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarioData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar usuário.');
  }
  return response.json();
};

// Função para atualizar um usuário existente
export const updateUsuario = async (id, usuarioData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData),
    });
    if (!response.ok) {
        throw new Error('Erro ao atualizar usuário.');
    }
    return response.json();
};

// Função para deletar um usuário
export const deleteUsuario = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Erro ao deletar usuário.');
    }
};