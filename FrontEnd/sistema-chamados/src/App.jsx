import React, { useState, useEffect } from 'react';
import { getToken, logout } from './services/authService';
import LoginForm from './components/auth/LoginForm';
import UsuarioList from './components/usuario/UsuarioList';
import UnidadeList from './components/unidade/UnidadeList';
import './App.css';

function App() {
  // Estado para verificar se o usuário está logado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  // Se não estiver autenticado, mostra o formulário de login
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Se estiver autenticado, mostra a aplicação principal
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestão de TI</h1>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </header>
      <main>
        <UsuarioList />
        <hr />
        <UnidadeList />
      </main>
    </div>
  );
}

export default App;