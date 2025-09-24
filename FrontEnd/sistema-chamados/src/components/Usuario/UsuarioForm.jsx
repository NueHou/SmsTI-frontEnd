import React, { useState, useEffect } from 'react';
import { createUsuario, updateUsuario } from '../../services/usuarioService';
import { Role, Status } from '../../utils/constants'; // Garanta que o nome seja 'Status'

// --- IMPORTANDO COMPONENTES DO MUI ---
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack // Para alinhar os botões
} from '@mui/material';

const UsuarioForm = ({ onUsuarioAdicionado, usuarioEmEdicao, onUsuarioAtualizado, onCancel }) => {
  // --- SUA LÓGICA DE ESTADO E FUNÇÕES PERMANECE A MESMA ---
  const [formData, setFormData] = useState({
    nome: '', email: '', senha: '', telefone: '', status: Status.ATIVO, role: Role.USUARIO,
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (usuarioEmEdicao) {
      setFormData({
        nome: usuarioEmEdicao.nome,
        email: usuarioEmEdicao.email,
        senha: '',
        telefone: usuarioEmEdicao.telefone,
        status: usuarioEmEdicao.status,
        role: usuarioEmEdicao.role,
      });
    } else {
      setFormData({
        nome: '', email: '', senha: '', telefone: '', status: Status.ATIVO, role: Role.USUARIO,
      });
    }
  }, [usuarioEmEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (usuarioEmEdicao) {
        const dadosParaAtualizar = { ...formData };
        if (!dadosParaAtualizar.senha) {
          delete dadosParaAtualizar.senha;
        }
        const usuarioAtualizado = await updateUsuario(usuarioEmEdicao.id, dadosParaAtualizar);
        setSuccess(`Usuário "${usuarioAtualizado.nome}" atualizado com sucesso!`);
        // Adiciona um pequeno delay antes de fechar para o usuário ver a mensagem
        setTimeout(() => onUsuarioAtualizado(usuarioAtualizado), 1500);
      } else {
        const novoUsuario = await createUsuario(formData);
        setSuccess(`Usuário "${novoUsuario.nome}" criado com sucesso!`);
        setTimeout(() => onUsuarioAdicionado(novoUsuario), 1500);
      }
    } catch (err) {
      setError(`Erro ao salvar o usuário. Tente novamente.`);
      console.error(err);
    }
  };

  // --- O JSX É REESCRITO COM COMPONENTES MUI ---
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        {usuarioEmEdicao ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        {/* Usamos Grid para organizar o formulário em colunas */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="nome"
              label="Nome Completo"
              value={formData.nome}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="password"
              name="senha"
              label="Nova Senha"
              placeholder="Deixe em branco para não alterar"
              value={formData.senha}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="telefone"
              label="Telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={Status.ATIVO}>Ativo</MenuItem>
                <MenuItem value={Status.INATIVO}>Inativo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Perfil (Role)</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={formData.role}
                label="Perfil (Role)"
                onChange={handleChange}
              >
                <MenuItem value={Role.USUARIO}>Usuário</MenuItem>
                <MenuItem value={Role.TECNICO}>Técnico</MenuItem>
                <MenuItem value={Role.ADMIN}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Mensagens de Sucesso e Erro */}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {/* Botões de Ação */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button type="submit" variant="contained">
            {usuarioEmEdicao ? 'Salvar Alterações' : 'Salvar Usuário'}
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default UsuarioForm;