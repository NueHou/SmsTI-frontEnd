import React, { useState, useEffect } from 'react';
import { getAllUnidades, deleteUnidade } from '../../services/unidadeService';
import UnidadeForm from './UnidadeForm';

// Componentes do MUI
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  CircularProgress, Chip, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const UnidadeList = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [unidadeParaEditar, setUnidadeParaEditar] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllUnidades();
      setUnidades(data);
      setError(null);
    } catch (err) {
      setError('Não foi possível carregar as unidades.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  const handleEdit = (unidade) => { setUnidadeParaEditar(unidade); setShowForm(true); };
  const handleAdd = () => { setUnidadeParaEditar(null); setShowForm(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await deleteUnidade(id);
        fetchData();
      } catch (err) {
        setError('Erro ao excluir a unidade.');
        console.error(err);
      }
    }
  };
  const handleFormSubmit = () => { setShowForm(false); fetchData(); };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Gestão de Unidades</Typography>
        <Button
          variant="contained"
          color={showForm ? "inherit" : "primary"}
          startIcon={!showForm && <AddIcon />}
          onClick={() => showForm ? setShowForm(false) : handleAdd()}
        >
          {showForm ? 'Cancelar' : 'Adicionar Unidade'}
        </Button>
      </Box>
      {showForm ? (
        <UnidadeForm onFormSubmit={handleFormSubmit} unidadeEmEdicao={unidadeParaEditar} onCancel={() => setShowForm(false)} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead><TableRow sx={{ backgroundColor: '#f5f5f' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow></TableHead>
            <TableBody>
              {unidades.map(unidade => (
                <TableRow key={unidade.id} hover>
                  <TableCell>{unidade.id}</TableCell>
                  <TableCell>{unidade.nome}</TableCell>
                  <TableCell>{unidade.telefone}</TableCell>
                  <TableCell><Chip label={unidade.status} color={unidade.status === 'ATIVO' ? 'success' : 'default'} size="small" /></TableCell>
                  <TableCell>{unidade.nomeResponsavel}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(unidade)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(unidade.id)}><DeleteIcon /></IconButton>
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

export default UnidadeList;