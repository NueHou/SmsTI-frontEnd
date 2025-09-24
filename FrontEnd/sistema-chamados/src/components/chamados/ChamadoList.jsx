import React, { useState, useEffect } from 'react';
import { getAllChamados, deleteChamado } from '../../services/chamadoService';
import ChamadoForm from './ChamadoForm';

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
  Chip // Usaremos o Chip para dar destaque ao Status e Prioridade
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Função para dar cores diferentes aos status e prioridades
const getChipColor = (value) => {
  switch (value) {
    case 'ALTA':
    case 'ABERTO':
      return 'error';
    case 'MEDIA':
    case 'EM_ANDAMENTO':
      return 'warning';
    case 'BAIXA':
      return 'info';
    case 'CONCLUIDO':
      return 'success';
    default:
      return 'default';
  }
};

const ChamadoList = () => {
  // --- SUA LÓGICA DE ESTADO E FUNÇÕES PERMANECE A MESMA ---
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [chamadoParaEditar, setChamadoParaEditar] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllChamados();
      setChamados(data);
    } catch (err) {
      setError('Não foi possível carregar os chamados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (chamado) => {
    setChamadoParaEditar(chamado);
    setShowForm(true);
  };

  const handleAdd = () => {
    setChamadoParaEditar(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este chamado?')) {
      try {
        await deleteChamado(id);
        fetchData();
      } catch (err) {
        setError('Erro ao excluir o chamado.');
        console.error(err);
      }
    }
  };
  
  const handleFormSubmit = () => {
    setShowForm(false);
    fetchData();
  };

  // --- O JSX É REESCRITO COM COMPONENTES MUI ---

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;
  }

  return (
    // Não usamos o <Container> aqui pois o App.jsx já controla o layout principal
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Painel de Chamados
        </Typography>
        <Button
          variant="contained"
          startIcon={!showForm && <AddIcon />}
          color={showForm ? "inherit" : "primary"}
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else {
              handleAdd();
            }
          }}
        >
          {showForm ? 'Cancelar' : 'Abrir Novo Chamado'}
        </Button>
      </Box>

      {showForm ? (
        <ChamadoForm 
          onFormSubmit={handleFormSubmit}
          chamadoEmEdicao={chamadoParaEditar}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Prioridade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Unidade</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Solicitante</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chamados.map(chamado => (
                <TableRow key={chamado.id} hover>
                  <TableCell>{chamado.id}</TableCell>
                  <TableCell>{chamado.titulo}</TableCell>
                  <TableCell>
                    <Chip label={chamado.statusChamado} color={getChipColor(chamado.statusChamado)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={chamado.prioridade} color={getChipColor(chamado.prioridade)} size="small" />
                  </TableCell>
                  <TableCell>{chamado.unidade?.nome || 'N/A'}</TableCell>
                  <TableCell>{chamado.usuario?.nome || 'N/A'}</TableCell> 
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(chamado)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(chamado.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ChamadoList;