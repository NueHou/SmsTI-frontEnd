import React, { useState, useEffect } from 'react';
import { getAllUsuarios, deleteUsuario } from '../../services/usuarioService';
import UsuarioForm from './UsuarioForm';

// --- IMPORTANDO COMPONENTES DO MUI ---
import { 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Box,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Fade,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EngineeringIcon from '@mui/icons-material/Engineering';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

  const handleAdicionarClick = () => {
    setUsuarioParaEditar(null);
    setShowForm(true);
  };
  
  const handleEditarClick = (usuario) => {
    setUsuarioParaEditar(usuario);
    setShowForm(true);
  };

  const handleUsuarioAdicionado = (novoUsuario) => {
    setUsuarios([...usuarios, novoUsuario]);
    setShowForm(false);
  };
  
  const handleUsuarioAtualizado = (usuarioAtualizado) => {
    setUsuarios(usuarios.map(u => (u.id === usuarioAtualizado.id ? usuarioAtualizado : u)));
    setShowForm(false);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUsuario(id);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (err) {
        setError('Erro ao excluir o usuário.');
        console.error(err);
      }
    }
  };

  // Função para filtrar usuários
  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para obter ícone do role
  const getRoleIcon = (role) => {
    switch (role) {
      case 'Nivel3':
        return <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />;
      case 'Nivel2':
        return <EngineeringIcon sx={{ fontSize: 16 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 16 }} />;
    }
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'STATUS_ATIVO':
        return 'success';
      case 'STATUS_INATIVO':
        return 'error';
      default:
        return 'default';
    }
  };

  // Função para obter cor do role
  const getRoleColor = (role) => {
    switch (role) {
      case 'Nivel3':
        return 'error';
      case 'Nivel2':
        return 'warning';
      default:
        return 'info';
    }
  };

  // Feedback visual para o carregamento
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={48} />
      </Box>
    );
  }
  
  // Exibição de erro
  if (error) {
    return (
      <Card sx={{ mt: 4, p: 4, textAlign: 'center', backgroundColor: 'error.dark' }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Card>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              Gestão de Usuários
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gerencie usuários, permissões e perfis de acesso
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={!showForm && <AddIcon />}
            color={showForm ? "inherit" : "primary"}
            onClick={() => {
              if (showForm) {
                setShowForm(false);
              } else {
                handleAdicionarClick();
              }
            }}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            {showForm ? 'Cancelar' : 'Adicionar Usuário'}
          </Button>
        </Box>

        {/* Barra de pesquisa */}
        {!showForm && (
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ py: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar usuários por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '12px',
                  }
                }}
              />
            </CardContent>
          </Card>
        )}

        {showForm ? (
          <Fade in timeout={300}>
            <Box>
              <UsuarioForm
                onUsuarioAdicionado={handleUsuarioAdicionado}
                usuarioEmEdicao={usuarioParaEditar}
                onUsuarioAtualizado={handleUsuarioAtualizado}
                onCancel={() => setShowForm(false)}
              />
            </Box>
          </Fade>
        ) : (
          <Fade in timeout={500}>
            <Card sx={{ overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      '& .MuiTableCell-head': {
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'primary.main',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                      }
                    }}>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Perfil</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsuarios.map((usuario) => (
                      <TableRow 
                        key={usuario.id} 
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                          },
                          '& .MuiTableCell-root': {
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          }
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          #{usuario.id}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                backgroundColor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                color: 'white',
                              }}
                            >
                              {usuario.nome.charAt(0).toUpperCase()}
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {usuario.nome}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {usuario.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={usuario.status === 'STATUS_ATIVO' ? 'Ativo' : 'Inativo'} 
                            color={getStatusColor(usuario.status)} 
                            size="small"
                            sx={{
                              fontWeight: 600,
                              borderRadius: '6px',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={getRoleIcon(usuario.role)}
                            label={
                              usuario.role === 'Nivel3' ? 'Admin' :
                              usuario.role === 'Nivel2' ? 'Técnico' : 'Usuário'
                            } 
                            color={getRoleColor(usuario.role)} 
                            size="small"
                            variant="outlined"
                            sx={{
                              fontWeight: 600,
                              borderRadius: '6px',
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Tooltip title="Editar usuário">
                              <IconButton 
                                color="primary" 
                                onClick={() => handleEditarClick(usuario)}
                                sx={{
                                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Excluir usuário">
                              <IconButton 
                                color="error" 
                                onClick={() => handleDelete(usuario.id)}
                                sx={{
                                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsuarios.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <PersonIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              Nenhum usuário encontrado
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {searchTerm ? 
                                'Tente ajustar os filtros de busca' : 
                                'Comece adicionando seu primeiro usuário'
                              }
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Fade>
        )}

        {/* Estatísticas rápidas */}
        {!showForm && usuarios.length > 0 && (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Estatísticas Rápidas
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {usuarios.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Usuários
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {usuarios.filter(u => u.status === 'STATUS_ATIVO').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usuários Ativos
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    {usuarios.filter(u => u.role === 'Nivel2').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Técnicos
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                    {usuarios.filter(u => u.role === 'Nivel3').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administradores
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Fade>
  );
};

export default UsuarioList;