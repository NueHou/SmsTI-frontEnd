import React, { useState, useEffect } from 'react';
import { createUnidade, updateUnidade } from '../../services/unidadeService';

const UnidadeForm = ({ onFormSubmit, unidadeEmEdicao, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    status: 'ATIVO',
    logradouro: '', // Campo para o endereço
    cidade: '',     // Campo para o endereço
    nomeResponsavel: '',
    telefoneResponsavel: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (unidadeEmEdicao) {
      setFormData({
        nome: unidadeEmEdicao.nome,
        telefone: unidadeEmEdicao.telefone,
        status: unidadeEmEdicao.status,
        logradouro: unidadeEmEdicao.endereco?.logradouro || '', // Acessando o campo aninhado
        cidade: unidadeEmEdicao.endereco?.cidade || '',
        nomeResponsavel: unidadeEmEdicao.nomeResponsavel,
        telefoneResponsavel: unidadeEmEdicao.telefoneResponsavel
      });
    } else {
      // Limpa o formulário
      setFormData({
        nome: '', telefone: '', status: 'ATIVO', logradouro: '', cidade: '', nomeResponsavel: '', telefoneResponsavel: ''
      });
    }
  }, [unidadeEmEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Monta o objeto final para enviar, com o endereço aninhado
    const dataToSend = {
      ...formData,
      endereco: {
        logradouro: formData.logradouro,
        cidade: formData.cidade
      }
    };
    
    try {
      let result;
      if (unidadeEmEdicao) {
        result = await updateUnidade(unidadeEmEdicao.id, dataToSend);
      } else {
        result = await createUnidade(dataToSend);
      }
      onFormSubmit(result); // Chama a função do pai para atualizar a lista
    } catch (err) {
      setError('Erro ao salvar a unidade. Verifique os dados.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="unidade-form">
      <h3>{unidadeEmEdicao ? 'Editar Unidade' : 'Adicionar Nova Unidade'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="form-group">
        <label>Nome da Unidade:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Telefone:</label>
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>
      <div className="form-group">
        <label>Endereço (Logradouro):</label>
        <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Endereço (Cidade):</label>
        <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Nome do Responsável:</label>
        <input type="text" name="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Telefone do Responsável:</label>
        <input type="text" name="telefoneResponsavel" value={formData.telefoneResponsavel} onChange={handleChange} />
      </div>
      
      <button type="submit">{unidadeEmEdicao ? 'Salvar Alterações' : 'Criar Unidade'}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default UnidadeForm;