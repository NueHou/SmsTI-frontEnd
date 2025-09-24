import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importe o ThemeProvider e o nosso novo tema
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Nosso arquivo de tema personalizado!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolva a aplicação com o ThemeProvider, passando nosso tema */}
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza o CSS */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);