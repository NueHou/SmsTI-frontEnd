import React, { useState, useEffect } from 'react';
import { getAllUnidades, deleteUnidade } from '../../services/unidadeService';
import UnidadeForm from './UnidadeForm';

const UnidadeList = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [unidadeParaEditar, setUnidadeParaEditar] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllUnidades();
      setUnidades(data);
    } catch (err) {
      setError('Não foi possível carregar as unidades.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (unidade) => {
    setUnidadeParaEditar(unidade);
    setShowForm(true);
  };

  const handleAdd = () => {
    setUnidadeParaEditar(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta unidade?')) {
      try {
        await deleteUnidade(id);
        fetchData(); // Recarrega a lista após a exclusão
      } catch (err) {
        setError('Erro ao excluir a unidade.');
        console.error(err);
      }
    }
  };
  
  const handleFormSubmit = () => {
    setShowForm(false);
    fetchData(); // Recarrega a lista após adicionar ou editar
  };

  if (loading) return <p>Carregando unidades...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2>Gestão de Unidades</h2>
      {!showForm ? (
        <button className="add-button" onClick={handleAdd}>Adicionar Nova Unidade</button>
      ) : (
        <UnidadeForm 
          onFormSubmit={handleFormSubmit}
          unidadeEmEdicao={unidadeParaEditar}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map(unidade => (
              <tr key={unidade.id}>
                <td>{unidade.id}</td>
                <td>{unidade.nome}</td>
                <td>{unidade.telefone}</td>
                <td>{unidade.status}</td>
                <td>{unidade.nomeResponsavel}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(unidade)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(unidade.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UnidadeList;