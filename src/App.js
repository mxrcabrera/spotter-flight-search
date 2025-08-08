import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import Header from './components/Layout/Header';
import FlightSearch from './components/FlightSearch/FlightSearch';
import FlightResults from './components/FlightSearch/FlightResults';
import Footer from './components/Layout/Footer';
import { FlightProvider } from './context/FlightContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8ab4f8',
    },
    background: {
      default: '#202124',
      paper: '#303134',
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6',
    },
    divider: '#3c4043',
  },
  typography: {
    fontFamily: [
      'Google Sans',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #3c4043',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = (searchParams) => {
    console.log('App: Search triggered with params:', searchParams);
    setSearchTrigger(prev => prev + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlightProvider>
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#202124'
        }}>
          <Header />
          <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <FlightSearch onSearch={handleSearch} />
            </Box>
            <FlightResults shouldSearch={searchTrigger} />
          </Container>
          <Footer />
        </Box>
      </FlightProvider>
    </ThemeProvider>
  );
}

export default App;