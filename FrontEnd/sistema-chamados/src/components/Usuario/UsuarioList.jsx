import React, { useState, useEffect } from 'react';
import { getAllUsuarios, deleteUsuario } from '../../services/usuarioService';
import UsuarioForm from './UsuarioForm';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // 1. Novo estado para guardar o usuário que será editado
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);

  useEffect(() => {
    // ... (código do useEffect continua o mesmo)
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const data = await getAllUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError('Não foi possível carregar a lista de usuários.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // 2. Handler para o clique no botão "Adicionar"
  const handleAdicionarClick = () => {
    setUsuarioParaEditar(null); // Garante que o form esteja em modo "criação"
    setShowForm(true);
  };
  
  // 3. Handler para o clique no botão "Editar"
  const handleEditarClick = (usuario) => {
    setUsuarioParaEditar(usuario); // Define qual usuário editar
    setShowForm(true); // Abre o formulário
  };

  const handleUsuarioAdicionado = (novoUsuario) => {
    setUsuarios([...usuarios, novoUsuario]);
    setShowForm(false);
  };
  
  // 4. Handler para quando um usuário for atualizado
  const handleUsuarioAtualizado = (usuarioAtualizado) => {
    // Atualiza a lista de usuários com os dados modificados
    setUsuarios(usuarios.map(u => (u.id === usuarioAtualizado.id ? usuarioAtualizado : u)));
    setShowForm(false); // Fecha o formulário
  };
  
  const handleDelete = async (id) => {
    // ... (código do handleDelete continua o mesmo)
    if (window.confirm('Tem certeza?')) {
      try {
        await deleteUsuario(id);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (err) {
        setError('Erro ao excluir o usuário.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2>Lista de Usuários</h2>

      <button className="add-button" onClick={handleAdicionarClick}>
        Adicionar Novo Usuário
      </button>
      
      {/* Botão para fechar o formulário */}
      {showForm && <button onClick={() => setShowForm(false)}>Cancelar</button>}

      {/* 5. Passa as novas props para o formulário */}
      {showForm && (
        <UsuarioForm
          onUsuarioAdicionado={handleUsuarioAdicionado}
          usuarioEmEdicao={usuarioParaEditar}
          onUsuarioAtualizado={handleUsuarioAtualizado}
        />
      )}
      
      <table style={{ marginTop: '20px' }}>
        <thead>
          {/* ... (cabeçalho da tabela) ... */}
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              {/* ... (células da tabela) ... */}
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.status}</td>
              <td>{usuario.role}</td>
              <td>
                {/* 6. O botão de editar agora chama o handler correto */}
                <button className="edit-button" onClick={() => handleEditarClick(usuario)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(usuario.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;