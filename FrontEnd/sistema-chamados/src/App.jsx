import React, { useState, useEffect } from 'react';
import { getToken, logout } from './services/authService';
import './App.css';

// Páginas
import LoginForm from './components/auth/LoginForm';
import UsuarioList from './components/usuario/UsuarioList';
import UnidadeList from './components/unidade/UnidadeList';
import PatrimonioList from './components/patrimonios/PatrimonioList';
import ChamadoList from './components/chamados/ChamadoList';

// Componentes de Layout do MUI
import {
  AppBar, Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, IconButton,
} from '@mui/material';

// Ícones do MUI para o Menu
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState('chamados');

  useEffect(() => {
    const token = getToken();
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'usuarios': return <UsuarioList />;
      case 'unidades': return <UnidadeList />;
      case 'patrimonios': return <PatrimonioList />;
      case 'chamados':
      default: return <ChamadoList />;
    }
  };
  
  const menuItems = [
    { text: 'Chamados', icon: <ConfirmationNumberIcon />, component: 'chamados' },
    { text: 'Usuários', icon: <GroupIcon />, component: 'usuarios' },
    { text: 'Unidades', icon: <BusinessIcon />, component: 'unidades' },
    { text: 'Patrimônios', icon: <ComputerIcon />, component: 'patrimonios' },
  ];

  return (
    // **AQUI ESTÁ A CORREÇÃO PRINCIPAL: minHeight: '100vh'**
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gestão de TI
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} aria-label="Sair">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth, flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderActiveComponent()}
      </Box>
    </Box>
  );
}

export default App;