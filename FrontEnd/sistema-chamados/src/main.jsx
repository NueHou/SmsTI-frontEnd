import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importe o CssBaseline do MUI
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Adicione o CssBaseline aqui. Ele reseta o CSS e aplica um padrão consistente */}
    <CssBaseline />
    <App />
  </React.StrictMode>,
);