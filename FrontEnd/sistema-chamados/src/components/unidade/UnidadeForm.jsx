import React, { useState, useEffect } from 'react';
import { createUnidade, updateUnidade } from '../../services/unidadeService';
import { Status } from '../../utils/constants';

import {
  Box, Button, TextField, Typography, Paper, Alert,
  Select, MenuItem, FormControl, InputLabel, Grid, Stack, Divider
} from '@mui/material';

const UnidadeForm = ({ onFormSubmit, unidadeEmEdicao, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '', telefone: '', status: Status.ATIVO,
    endereco: { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' },
    nomeResponsavel: '', telefoneResponsavel: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (unidadeEmEdicao) {
      setFormData({
        nome: unidadeEmEdicao.nome || '',
        telefone: unidadeEmEdicao.telefone || '',
        status: unidadeEmEdicao.status || Status.ATIVO,
        endereco: {
          rua: unidadeEmEdicao.endereco?.rua || '',
          numero: unidadeEmEdicao.endereco?.numero || '',
          complemento: unidadeEmEdicao.endereco?.complemento || '',
          bairro: unidadeEmEdicao.endereco?.bairro || '',
          cidade: unidadeEmEdicao.endereco?.cidade || '',
          estado: unidadeEmEdicao.endereco?.estado || '',
          cep: unidadeEmEdicao.endereco?.cep || '',
        },
        nomeResponsavel: unidadeEmEdicao.nomeResponsavel || '',
        telefoneResponsavel: unidadeEmEdicao.telefoneResponsavel || ''
      });
    } else {
      setFormData({
        nome: '', telefone: '', status: Status.ATIVO,
        endereco: { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' },
        nomeResponsavel: '', telefoneResponsavel: ''
      });
    }
  }, [unidadeEmEdicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const addressFields = ['rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep'];
    if (addressFields.includes(name)) {
      setFormData(prevState => ({ ...prevState, endereco: { ...prevState.endereco, [name]: value } }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (unidadeEmEdicao) {
        await updateUnidade(unidadeEmEdicao.id, formData);
      } else {
        await createUnidade(formData);
      }
      onFormSubmit();
    } catch (err) {
      setError('Erro ao salvar a unidade. Verifique os dados.');
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mt: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
        {unidadeEmEdicao ? 'Editar Unidade' : 'Adicionar Nova Unidade'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* AQUI ESTÁ A CORREÇÃO: O TÍTULO DA SEÇÃO DENTRO DE UM GRID ITEM DE LARGURA TOTAL */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Dados da Unidade</Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} md={9}><TextField fullWidth required name="nome" label="Nome da Unidade" value={formData.nome} onChange={handleChange} /></Grid>
          <Grid item xs={12} md={3}>
            {/* A SOLUÇÃO: Adicionamos a prop 'sx' para forçar o componente
              a se comportar corretamente dentro do grid.
            */}
            <FormControl 
              fullWidth 
              sx={{ 
                '& .MuiInputBase-root': { width: '100%' },
                boxSizing: 'border-box' 
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
                <MenuItem value={Status.ATIVO}>Ativo</MenuItem>
                <MenuItem value={Status.INATIVO}>Inativo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}><Typography variant="subtitle1" gutterBottom sx={{mt: 2}}>Endereço</Typography><Divider /></Grid>
          <Grid item xs={12} sm={9}><TextField fullWidth name="rua" label="Rua" value={formData.endereco.rua} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth name="numero" label="Número" value={formData.endereco.numero} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth name="bairro" label="Bairro" value={formData.endereco.bairro} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth name="complemento" label="Complemento" value={formData.endereco.complemento} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth name="cidade" label="Cidade" value={formData.endereco.cidade} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth name="estado" label="Estado" value={formData.endereco.estado} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth name="cep" label="CEP" value={formData.endereco.cep} onChange={handleChange} /></Grid>
          
          <Grid item xs={12}><Typography variant="subtitle1" gutterBottom sx={{mt: 2}}>Responsável e Contatos</Typography><Divider /></Grid>
          <Grid item xs={12} md={8}><TextField fullWidth name="nomeResponsavel" label="Nome do Responsável" value={formData.nomeResponsavel} onChange={handleChange} /></Grid>
          <Grid item xs={12} md={4}><TextField fullWidth name="telefoneResponsavel" label="Telefone do Responsável" value={formData.telefoneResponsavel} onChange={handleChange} /></Grid>
          <Grid item xs={12} md={4}><TextField fullWidth name="telefone" label="Telefone da Unidade" value={formData.telefone} onChange={handleChange} /></Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-start' }}>
          <Button type="submit" variant="contained" color="primary" size="large">{unidadeEmEdicao ? 'Salvar Alterações' : 'Salvar Unidade'}</Button>
          <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default UnidadeForm;