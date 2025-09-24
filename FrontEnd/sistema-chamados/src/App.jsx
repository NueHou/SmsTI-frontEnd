import React, { useState, useEffect } from 'react';
import { getToken, logout } from './services/authService';

// Páginas/Componentes da aplicação
import LoginForm from './components/auth/LoginForm';
import UsuarioList from './components/usuario/UsuarioList';
import UnidadeList from './components/unidade/UnidadeList';
import PatrimonioList from './components/patrimonios/PatrimonioList';
import ChamadoList from './components/chamados/ChamadoList';

// --- Componentes de Layout do MUI ---
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';

// --- Ícones do MUI para o Menu ---
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // Chamados
import GroupIcon from '@mui/icons-material/Group'; // Usuários
import BusinessIcon from '@mui/icons-material/Business'; // Unidades
import ComputerIcon from '@mui/icons-material/Computer'; // Patrimônios
import LogoutIcon from '@mui/icons-material/Logout';

// Largura do nosso menu lateral
const drawerWidth = 240;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para controlar qual tela está sendo exibida
  const [activeComponent, setActiveComponent] = useState('chamados');

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
  
  // Função para renderizar o componente ativo
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'usuarios':
        return <UsuarioList />;
      case 'unidades':
        return <UnidadeList />;
      case 'patrimonios':
        return <PatrimonioList />;
      case 'chamados':
      default:
        return <ChamadoList />;
    }
  };
  
  const menuItems = [
    { text: 'Chamados', icon: <ConfirmationNumberIcon />, component: 'chamados' },
    { text: 'Usuários', icon: <GroupIcon />, component: 'usuarios' },
    { text: 'Unidades', icon: <BusinessIcon />, component: 'unidades' },
    { text: 'Patrimônios', icon: <ComputerIcon />, component: 'patrimonios' },
  ];

  // Se estiver autenticado, mostra o novo layout com menu
  return (
    <Box sx={{ display: 'flex' }}>
      {/* BARRA DO TOPO */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gestão de TI
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} aria-label="Sair">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MENU LATERAL */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Espaço para ficar abaixo do AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={activeComponent === item.component}
                  onClick={() => setActiveComponent(item.component)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar /> {/* Espaço para o conteúdo não ficar escondido atrás do AppBar */}
        {renderActiveComponent()}
      </Box>
    </Box>
  );
}

export default App;