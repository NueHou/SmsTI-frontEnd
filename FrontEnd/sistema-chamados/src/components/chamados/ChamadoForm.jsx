import React, { useState, useEffect } from 'react';
import { createChamado, updateChamado } from '../../services/chamadoService';
import { getAllUnidades } from '../../services/unidadeService';
import { getAllPatrimonios } from '../../services/patrimonioService';
import { Prioridade, Categoria } from '../../utils/constants';

const ChamadoForm = ({ onFormSubmit, chamadoEmEdicao, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    prioridade: Prioridade.BAIXA,
    categoria: Categoria.HARDWARE,
    unidadeId: '',
    patrimonioId: '',
  });

  // Estados para armazenar as listas dos dropdowns
  const [unidades, setUnidades] = useState([]);
  const [patrimonios, setPatrimonios] = useState([]);
  const [error, setError] = useState(null);

  // useEffect para carregar dados externos (unidades e patrimônios)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [unidadesData, patrimoniosData] = await Promise.all([
          getAllUnidades(),
          getAllPatrimonios()
        ]);
        setUnidades(unidadesData);
        setPatrimonios(patrimoniosData);
      } catch (err) {
        setError('Erro ao carregar dados para o formulário.');
        console.error(err);
      }
    };
    carregarDados();
  }, []);

  // useEffect para preencher o formulário em modo de edição
  useEffect(() => {
    if (chamadoEmEdicao) {
      setFormData({
        titulo: chamadoEmEdicao.titulo,
        descricao: chamadoEmEdicao.descricao,
        prioridade: chamadoEmEdicao.prioridade,
        categoria: chamadoEmEdicao.categoria,
        unidadeId: chamadoEmEdicao.unidade?.id || '',
        patrimonioId: chamadoEmEdicao.patrimonio?.id || '',
      });
    }
  }, [chamadoEmEdicao]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const dataToSend = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      prioridade: formData.prioridade,
      categoria: formData.categoria,
      unidade: { id: formData.unidadeId },
      patrimonio: formData.patrimonioId ? { id: formData.patrimonioId } : null,
    };

    try {
      let result;
      if (chamadoEmEdicao) {
        result = await updateChamado(chamadoEmEdicao.id, dataToSend);
      } else {
        result = await createChamado(dataToSend);
      }
      onFormSubmit(result);
    } catch (err) {
      setError('Erro ao salvar o chamado. Verifique os campos.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chamado-form">
      <h3>{chamadoEmEdicao ? 'Editar Chamado' : 'Abrir Novo Chamado'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="form-group">
        <label>Título:</label>
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Prioridade:</label>
        <select name="prioridade" value={formData.prioridade} onChange={handleChange}>
          {Object.values(Prioridade).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Categoria:</label>
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          {Object.values(Categoria).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Unidade:</label>
        <select name="unidadeId" value={formData.unidadeId} onChange={handleChange} required>
          <option value="">Selecione uma Unidade</option>
          {unidades.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Patrimônio (Opcional):</label>
        <select name="patrimonioId" value={formData.patrimonioId} onChange={handleChange}>
          <option value="">Nenhum</option>
          {patrimonios.map(p => <option key={p.id} value={p.id}>{p.nome} - ({p.unidade.nome})</option>)}
        </select>
      </div>
      
      <button type="submit">{chamadoEmEdicao ? 'Salvar Alterações' : 'Abrir Chamado'}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ChamadoForm;