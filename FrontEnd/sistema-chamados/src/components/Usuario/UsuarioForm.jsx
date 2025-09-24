import React, { useState, useEffect } from 'react';
import { createUsuario, updateUsuario } from '../../services/usuarioService';
import { Role, Status } from '../../utils/constants';

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
  Stack,
  Card,
  CardContent,
  InputAdornment,
  Fade,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const UsuarioForm = ({ onUsuarioAdicionado, usuarioEmEdicao, onUsuarioAtualizado, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '', email: '', senha: '', telefone: '', status: Status.ATIVO, role: Role.USUARIO,
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      if (usuarioEmEdicao) {
        const dadosParaAtualizar = { ...formData };
        if (!dadosParaAtualizar.senha) {
          delete dadosParaAtualizar.senha;
        }
        const usuarioAtualizado = await updateUsuario(usuarioEmEdicao.id, dadosParaAtualizar);
        setSuccess(`Usuário "${usuarioAtualizado.nome}" atualizado com sucesso!`);
        setTimeout(() => onUsuarioAtualizado(usuarioAtualizado), 1500);
      } else {
        const novoUsuario = await createUsuario(formData);
        setSuccess(`Usuário "${novoUsuario.nome}" criado com sucesso!`);
        setTimeout(() => onUsuarioAdicionado(novoUsuario), 1500);
      }
    } catch (err) {
      setError(`Erro ao salvar o usuário. Tente novamente.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={300}>
      <Card sx={{ overflow: 'hidden' }}>
        {/* Header do formulário */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
          p: 3,
          color: 'white'
        }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            {usuarioEmEdicao ? 'Editar Usuário' : 'Novo Usuário'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            {usuarioEmEdicao ? 
              'Atualize as informações do usuário' : 
              'Preencha os dados para criar um novo usuário'
            }
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            {/* Informações Básicas */}
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
              Informações Básicas
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="nome"
                  label="Nome Completo"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="telefone"
                  label="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  name="senha"
                  label={usuarioEmEdicao ? "Nova Senha (deixe vazio para não alterar)" : "Senha"}
                  placeholder={usuarioEmEdicao ? "Deixe em branco para não alterar" : ""}
                  value={formData.senha}
                  onChange={handleChange}
                  disabled={loading}
                  required={!usuarioEmEdicao}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Configurações de Acesso */}
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <LockIcon sx={{ mr: 1, color: 'primary.main' }} />
              Configurações de Acesso
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl 
                  fullWidth 
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                >
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={Status.ATIVO}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: 'success.main', 
                            mr: 1 
                          }} 
                        />
                        Ativo
                      </Box>
                    </MenuItem>
                    <MenuItem value={Status.INATIVO}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: 'error.main', 
                            mr: 1 
                          }} 
                        />
                        Inativo
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl 
                  fullWidth 
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                >
                  <InputLabel id="role-select-label">Perfil de Acesso</InputLabel>
                  <Select
                    labelId="role-select-label"
                    name="role"
                    value={formData.role}
                    label="Perfil de Acesso"
                    onChange={handleChange}
                  >
                    <MenuItem value={Role.USUARIO}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, fontSize: 18, color: 'info.main' }} />
                        Usuário
                      </Box>
                    </MenuItem>
                    <MenuItem value={Role.TECNICO}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, fontSize: 18, color: 'warning.main' }} />
                        Técnico
                      </Box>
                    </MenuItem>
                    <MenuItem value={Role.ADMIN}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, fontSize: 18, color: 'error.main' }} />
                        Administrador
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Mensagens de Sucesso e Erro */}
            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  mt: 3,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: 'success.main',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                }}
              >
                {success}
              </Alert>
            )}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 3,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: 'error.main',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                {error}
              </Alert>
            )}

            {/* Botões de Ação */}
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button 
                type="submit" 
                variant="contained" 
                startIcon={<SaveIcon />}
                disabled={loading}
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {usuarioEmEdicao ? 'Salvar Alterações' : 'Criar Usuário'}
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<CloseIcon />}
                onClick={onCancel}
                disabled={loading}
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'text.secondary',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'error.main',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: 'error.main',
                  },
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default UsuarioForm;