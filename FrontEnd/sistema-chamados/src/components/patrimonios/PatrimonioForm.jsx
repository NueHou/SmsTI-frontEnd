import React, { useState, useEffect } from 'react';
import { createPatrimonio, updatePatrimonio } from '../../services/patrimonioService';
import { getAllUnidades } from '../../services/unidadeService'; // Precisamos buscar as unidades!

const PatrimonioForm = ({ onFormSubmit, patrimonioEmEdicao, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'COMPUTADOR', // Um valor padrão
    unidadeId: '' // Campo para o ID da unidade selecionada
  });
  
  // Estado para armazenar a lista de unidades buscada da API
  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState(null);

  // useEffect para buscar a lista de unidades quando o formulário for montado
  useEffect(() => {
    const carregarUnidades = async () => {
      try {
        const data = await getAllUnidades();
        setUnidades(data);
      } catch (err) {
        console.error("Erro ao carregar unidades", err);
        setError("Não foi possível carregar a lista de unidades.");
      }
    };
    carregarUnidades();
  }, []); // O array vazio [] garante que rode apenas uma vez

  // useEffect para preencher o formulário no modo de edição
  useEffect(() => {
    if (patrimonioEmEdicao) {
      setFormData({
        nome: patrimonioEmEdicao.nome,
        tipo: patrimonioEmEdicao.tipo,
        // O back-end deve retornar o 'unidade' como um objeto aninhado
        unidadeId: patrimonioEmEdicao.unidade?.id || '' 
      });
    } else {
      setFormData({ nome: '', tipo: 'COMPUTADOR', unidadeId: '' });
    }
  }, [patrimonioEmEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Garantir que uma unidade foi selecionada
    if (!formData.unidadeId) {
      setError("Por favor, selecione uma unidade.");
      return;
    }
    
    try {
      let result;
      // No back-end, esperamos receber o ID da unidade
      const dataToSend = {
          nome: formData.nome,
          tipo: formData.tipo,
          unidade: { id: formData.unidadeId }
      };

      if (patrimonioEmEdicao) {
        result = await updatePatrimonio(patrimonioEmEdicao.id, dataToSend);
      } else {
        result = await createPatrimonio(dataToSend);
      }
      onFormSubmit(result);
    } catch (err) {
      setError('Erro ao salvar o patrimônio.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patrimonio-form">
      <h3>{patrimonioEmEdicao ? 'Editar Patrimônio' : 'Adicionar Novo Patrimônio'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="form-group">
        <label>Nome do Patrimônio:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label>Tipo:</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="COMPUTADOR">Computador</option>
          <option value="MONITOR">Monitor</option>
          <option value="IMPRESSORA">Impressora</option>
          <option value="NOTEBOOK">Notebook</option>
          <option value="OUTRO">Outro</option>
        </select>
      </div>

      <div className="form-group">
        <label>Unidade:</label>
        <select name="unidadeId" value={formData.unidadeId} onChange={handleChange} required>
          <option value="">Selecione uma Unidade</option>
          {unidades.map(unidade => (
            <option key={unidade.id} value={unidade.id}>
              {unidade.nome}
            </option>
          ))}
        </select>
      </div>
      
      <button type="submit">{patrimonioEmEdicao ? 'Salvar Alterações' : 'Criar Patrimônio'}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default PatrimonioForm;