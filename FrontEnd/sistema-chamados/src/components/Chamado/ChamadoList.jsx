// src/components/Chamados/ChamadoLista.js
import React, { useState, useEffect } from 'react';
import ChamadoCard from './ChamadoCard';
import api from '../../services/api'; // Supondo que você tem um arquivo de serviço para a API

function ChamadoLista() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os chamados da API
    async function fetchChamados() {
      try {
        const response = await api.get('/chamados'); // Rota de sua API
        setChamados(response.data);
      } catch (err) {
        setError("Não foi possível carregar os chamados.");
        console.error("Erro ao buscar chamados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChamados();
  }, []); // O array vazio garante que a função só roda uma vez

  if (loading) {
    return <div>Carregando chamados...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="chamado-lista">
      <h2>Lista de Chamados</h2>
      {chamados.length > 0 ? (
        chamados.map(chamado => (
          // Renderiza um card para cada chamado
          <ChamadoCard key={chamado.id} chamado={chamado} />
        ))
      ) : (
        <p>Nenhum chamado encontrado.</p>
      )}
    </div>
  );
}

export default ChamadoLista;