import React from 'react';
import UsuarioList from './components/usuario/UsuarioList.jsx';
import UnidadeList from './components/unidade/UnidadeList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestão de TI</h1>
      </header>
      <main>
        {/* Você pode comentar um e descomentar o outro para testar */}
        <UsuarioList />
        <hr /> {/* Uma linha para separar as seções */}
        <UnidadeList />
      </main>
    </div>
  );
}

export default App;