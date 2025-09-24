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
  Avatar,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// --- Ícones do MUI para o Menu ---
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';

// Tema escuro moderno
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Azul moderno
      dark: '#1E40AF',
      light: '#60A5FA',
    },
    secondary: {
      main: '#10B981', // Verde esmeralda
      dark: '#047857',
      light: '#34D399',
    },
    background: {
      default: '#0F172A', // Muito escuro
      paper: '#1E293B', // Cinza escuro para cards
    },
    surface: {
      main: '#334155', // Cinza médio
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
    },
    success: {
      main: '#22C55E',
    },
    warning: {
      main: '#F59E0B',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          borderBottom: '1px solid #334155',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E293B',
          borderRight: '1px solid #334155',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: '#3B82F6',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#2563EB',
            },
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
          '&:hover': {
            backgroundColor: '#334155',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          borderRadius: '12px',
          border: '1px solid #334155',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        outlined: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Largura do nosso menu lateral
const drawerWidth = 280;

// Dashboard com estatísticas
const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ConfirmationNumberIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    142
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chamados Ativos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    28
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usuários
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BusinessIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unidades
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ComputerIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                    89
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Patrimônios
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Se não estiver autenticado, mostra o formulário de login
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={darkTheme}>
        <LoginForm />
      </ThemeProvider>
    );
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
        return <ChamadoList />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, component: 'dashboard' },
    { text: 'Chamados', icon: <ConfirmationNumberIcon />, component: 'chamados' },
    { text: 'Usuários', icon: <GroupIcon />, component: 'usuarios' },
    { text: 'Unidades', icon: <BusinessIcon />, component: 'unidades' },
    { text: 'Patrimônios', icon: <ComputerIcon />, component: 'patrimonios' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            TI System
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto', mt: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={activeComponent === item.component}
                onClick={() => {
                  setActiveComponent(item.component);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon sx={{ color: activeComponent === item.component ? 'inherit' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  // Se estiver autenticado, mostra o novo layout com menu
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        {/* BARRA DO TOPO */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Sistema de Gestão de TI
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
                A
              </Avatar>
              <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}>
                Admin
              </Typography>
              <IconButton color="inherit" onClick={handleLogout} aria-label="Sair">
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* MENU LATERAL */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            bgcolor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          {renderActiveComponent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;