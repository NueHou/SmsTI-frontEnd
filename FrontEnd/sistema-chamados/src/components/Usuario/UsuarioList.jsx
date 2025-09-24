import React, { useState, useEffect } from 'react';
import { getAllUsuarios, deleteUsuario } from '../../services/usuarioService';
import UsuarioForm from './UsuarioForm';

// --- 1. IMPORTANDO COMPONENTES DO MUI ---
import { 
  Container, 
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
  CircularProgress // Para o feedback de loading
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// -----------------------------------------

const UsuarioList = () => {
  // --- 2. TODA A SUA LÓGICA DE ESTADO E FUNÇÕES PERMANECE A MESMA ---
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);

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

  // --- 3. O JSX É TOTALMENTE REESCRITO COM COMPONENTES MUI ---

  // Feedback visual para o carregamento
  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography>Carregando usuários...</Typography>
      </Container>
    );
  }
  
  // Exibição de erro
  if (error) {
    return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Gestão de Usuários
        </Typography>
        {/* O botão agora alterna entre Adicionar e Cancelar, controlando a visibilidade do form */}
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
        >
          {showForm ? 'Cancelar' : 'Adicionar Usuário'}
        </Button>
      </Box>

      {showForm ? (
        // O formulário é exibido aqui
        <UsuarioForm
          onUsuarioAdicionado={handleUsuarioAdicionado}
          usuarioEmEdicao={usuarioParaEditar}
          onUsuarioAtualizado={handleUsuarioAtualizado}
          // Passamos a função para o botão de cancelar do form
          onCancel={() => setShowForm(false)}
        />
      ) : (
        // A tabela é exibida aqui
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Perfil</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map(usuario => (
                <TableRow key={usuario.id} hover>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.status}</TableCell>
                  <TableCell>{usuario.role}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditarClick(usuario)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(usuario.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UsuarioList;