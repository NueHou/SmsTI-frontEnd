import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsuariosPage from "./pages/UsuariosPage";
import ChamadosPage from "./pages/ChamadosPage";
import InventarioPage from "./pages/InventarioPage";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/chamados">Chamados</Link>
        <Link to="/inventario">Inventário</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/chamados" element={<ChamadosPage />} />
        <Route path="/inventario" element={<InventarioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
