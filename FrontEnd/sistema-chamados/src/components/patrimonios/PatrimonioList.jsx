import React, { useState, useEffect } from 'react';
import { getAllPatrimonios, deletePatrimonio } from '../../services/patrimonioService';
import PatrimonioForm from './PatrimonioForm';

const PatrimonioList = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [patrimonioParaEditar, setPatrimonioParaEditar] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllPatrimonios();
      setPatrimonios(data);
    } catch (err) {
      setError('Não foi possível carregar os patrimônios.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (patrimonio) => {
    setPatrimonioParaEditar(patrimonio);
    setShowForm(true);
  };

  const handleAdd = () => {
    setPatrimonioParaEditar(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este patrimônio?')) {
      try {
        await deletePatrimonio(id);
        fetchData();
      } catch (err) {
        setError('Erro ao excluir o patrimônio.');
        console.error(err);
      }
    }
  };
  
  const handleFormSubmit = () => {
    setShowForm(false);
    fetchData();
  };

  if (loading) return <p>Carregando patrimônios...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2>Gestão de Patrimônios</h2>
      {!showForm ? (
        <button className="add-button" onClick={handleAdd}>Adicionar Novo Patrimônio</button>
      ) : (
        <PatrimonioForm 
          onFormSubmit={handleFormSubmit}
          patrimonioEmEdicao={patrimonioParaEditar}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Unidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patrimonios.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.tipo}</td>
                {/* Usamos optional chaining (?.) para evitar erros se a unidade for nula */}
                <td>{p.unidade?.nome || 'N/A'}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDelete(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatrimonioList;