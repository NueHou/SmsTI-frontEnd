import React, { useState, useEffect } from 'react';
// 1. Importamos o `updateUsuario`
import { createUsuario, updateUsuario } from '../../services/usuarioService';
import { Role, Status } from '../../utils/constants';

// 2. Recebemos as novas props
const UsuarioForm = ({ onUsuarioAdicionado, usuarioEmEdicao, onUsuarioAtualizado }) => {
  const [formData, setFormData] = useState({
    nome: '', email: '', senha: '', telefone: '', status: Status.ATIVO, role: Role.USUARIO,
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 3. useEffect para preencher o formulário quando um usuário for passado para edição
  useEffect(() => {
    if (usuarioEmEdicao) {
      // Preenchemos o formulário com os dados do usuário, exceto a senha
      setFormData({
        nome: usuarioEmEdicao.nome,
        email: usuarioEmEdicao.email,
        senha: '', // Deixamos a senha em branco por segurança
        telefone: usuarioEmEdicao.telefone,
        status: usuarioEmEdicao.status,
        role: usuarioEmEdicao.role,
      });
    } else {
      // Limpa o formulário se estiver em modo de criação
      setFormData({
        nome: '', email: '', senha: '', telefone: '', status: Status.ATIVO, role: Role.USUARIO,
      });
    }
  }, [usuarioEmEdicao]); // Este efeito roda sempre que `usuarioEmEdicao` mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 4. Lógica para decidir entre criar ou atualizar
    try {
      if (usuarioEmEdicao) {
        // MODO EDIÇÃO
        const dadosParaAtualizar = { ...formData };
        // Se a senha estiver em branco, não a enviamos para o backend
        if (!dadosParaAtualizar.senha) {
          delete dadosParaAtualizar.senha;
        }
        const usuarioAtualizado = await updateUsuario(usuarioEmEdicao.id, dadosParaAtualizar);
        setSuccess(`Usuário "${usuarioAtualizado.nome}" atualizado com sucesso!`);
        if (onUsuarioAtualizado) {
          onUsuarioAtualizado(usuarioAtualizado);
        }
      } else {
        // MODO CRIAÇÃO
        const novoUsuario = await createUsuario(formData);
        setSuccess(`Usuário "${novoUsuario.nome}" criado com sucesso!`);
        if (onUsuarioAdicionado) {
          onUsuarioAdicionado(novoUsuario);
        }
      }
    } catch (err) {
      setError(`Erro ao salvar o usuário. Tente novamente.`);
      console.error(err);
    }
  };

  return (
    // 5. Título e botão dinâmicos
    <form onSubmit={handleSubmit} className="usuario-form">
      <h3>{usuarioEmEdicao ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
      
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Os inputs continuam os mesmos... */}
      <div className="form-group">
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Nova Senha:</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Deixe em branco para não alterar" />
      </div>
      {/* ...resto do formulário... */}
      <div className="form-group">
        <label>Telefone:</label>
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value={Status.ATIVO}>Ativo</option>
          <option value={Status.INATIVO}>Inativo</option>
        </select>
      </div>
      <div className="form-group">
        <label>Perfil (Role):</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value={Role.USUARIO}>Usuário</option>
          <option value={Role.TECNICO}>Técnico</option>
          <option value={Role.ADMIN}>Admin</option>
        </select>
      </div>
      
      <button type="submit">{usuarioEmEdicao ? 'Salvar Alterações' : 'Salvar Usuário'}</button>
    </form>
  );
};

export default UsuarioForm;