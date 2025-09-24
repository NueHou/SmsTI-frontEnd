import { createTheme } from '@mui/material/styles';

// Vamos definir nossa paleta de cores personalizada baseada na sua imagem.
const theme = createTheme({
  palette: {
    mode: 'dark', // Ativa o modo escuro como base
    primary: {
      // Esta será nossa cor de destaque (o rosa/vermelho)
      main: '#E91E63', // Um rosa vibrante do Material Design
    },
    background: {
      // Tons de fundo mais escuros e profundos, como na sua referência
      default: '#121212', // Fundo principal da página
      paper: '#1E1E1E',   // Fundo de "cards", tabelas, menus, etc.
    },
    text: {
      primary: '#FFFFFF', // Cor do texto principal
      secondary: '#B0B0B0', // Cor de textos secundários
    },
  },
  components: {
    // Definimos o estilo padrão para todos os TextFields da aplicação
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Todos os campos de texto serão do tipo "outlined"
      },
    },
    // Definimos o estilo padrão para todos os Botões
    MuiButton: {
      defaultProps: {
        variant: 'contained', // Todos os botões principais serão preenchidos
      },
      styleOverrides: {
        root: {
          textTransform: 'none', // Impede que o texto do botão fique em MAIÚSCULAS
          fontWeight: 'bold',
        }
      }
    }
  }
});

export default theme;