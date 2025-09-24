import React, { useState, useEffect } from 'react';
import { createUnidade, updateUnidade } from '../../services/unidadeService';
import { StatusUsuario } from '../../utils/constants';

const UnidadeForm = ({ onFormSubmit, unidadeEmEdicao, onCancel }) => {
  // 1. ESTADO ATUALIZADO com todos os campos do endereço
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    StatusUsuario: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    nomeResponsavel: '',
    telefoneResponsavel: ''
  });
  const [error, setError] = useState(null);

  // 2. USEEFFECT ATUALIZADO para preencher todos os campos na edição
  useEffect(() => {
    if (unidadeEmEdicao) {
      setFormData({
        nome: unidadeEmEdicao.nome || '',
        telefone: unidadeEmEdicao.telefone || '',
        StatusUsuario: unidadeEmEdicao.statusUnidade || '',
        rua: unidadeEmEdicao.endereco?.rua || '',
        numero: unidadeEmEdicao.endereco?.numero || '',
        complemento: unidadeEmEdicao.endereco?.complemento || '',
        bairro: unidadeEmEdicao.endereco?.bairro || '',
        cidade: unidadeEmEdicao.endereco?.cidade || '',
        estado: unidadeEmEdicao.endereco?.estado || '',
        cep: unidadeEmEdicao.endereco?.cep || '',
        nomeResponsavel: unidadeEmEdicao.nomeResponsavel || '',
        telefoneResponsavel: unidadeEmEdicao.telefoneResponsavel || ''
      });
    } else {
      // Limpa o formulário para um novo registro
      setFormData({
        nome: '', telefone: '', StatusUsuario: '',  rua: '', numero: '', complemento: '',
        bairro: '', cidade: '', estado: '', cep: '', nomeResponsavel: '', telefoneResponsavel: ''
      });
    }
  }, [unidadeEmEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // 3. HANDLESUBMIT ATUALIZADO para montar o objeto 'endereco' completo
    const dataToSend = {
      nome: formData.nome,
      telefone: formData.telefone,
      StatusUsuario: formData.statusUnidade,
      nomeResponsavel: formData.nomeResponsavel,
      telefoneResponsavel: formData.telefoneResponsavel,
      endereco: {
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep
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
    // 4. JSX ATUALIZADO com todos os novos campos de input
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
      <hr />
      <h4>Endereço</h4>
      <div className="form-group">
        <label>Rua:</label>
        <input type="text" name="rua" value={formData.rua} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Número:</label>
        <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
      </div>
       <div className="form-group">
        <label>Complemento:</label>
        <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Bairro:</label>
        <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Cidade:</label>
        <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Estado:</label>
        <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
      </div>
       <div className="form-group">
        <label>CEP:</label>
        <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
      </div>
      <hr />

      <h4>Responsável</h4>
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