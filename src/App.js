import { useMemo, lazy, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Header from './components/Layout/Header';
import FlightSearch from './components/FlightSearch/FlightSearch';
import Footer from './components/Layout/Footer';
import OnboardingTour from './components/Onboarding/OnboardingTour';
import { FlightProvider } from './context/FlightContext';
import { ThemeModeProvider, useThemeMode } from './context/ThemeContext';
import { OnboardingProvider } from './context/OnboardingContext';

const FlightResults = lazy(() => import('./components/FlightSearch/FlightResults'));

function AppContent() {
  const { mode } = useThemeMode();

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1a73e8',
        light: '#4285f4',
        dark: '#1557b0',
        contrastText: '#ffffff',
      },
      success: {
        main: '#137333',
        light: '#81c784',
        dark: '#0d5626',
      },
      error: {
        main: '#c5221f',
        light: '#ef9a9a',
        dark: '#a31815',
      },
      warning: {
        main: '#8a5200',
        light: '#ffb74d',
        dark: '#6b4000',
      },
      ...(mode === 'dark' ? {
        background: {
          default: '#202124',
          paper: '#303134',
        },
        text: {
          primary: '#e8eaed',
          secondary: '#bdc1c6',
        },
        divider: '#3c4043',
      } : {
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
        text: {
          primary: '#202124',
          secondary: '#5f6368',
        },
        divider: '#dadce0',
      }),
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      h6: {
        fontWeight: 500,
      },
      body1: {
        fontWeight: 400,
      },
      body2: {
        fontWeight: 400,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& input[type="date"]': {
              colorScheme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            },
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
              cursor: 'pointer',
            },
          }),
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': {
              pointerEvents: 'none',
            },
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
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OnboardingProvider>
        <FlightProvider>
          <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default'
          }}>
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
                <FlightSearch />
              </Container>
              <Suspense fallback={
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
                  <Skeleton variant="rectangular" height={120} sx={{ mb: 3, borderRadius: 2 }} />
                  <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
                  <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                </Box>
              }>
                <FlightResults />
              </Suspense>
            </Box>
            <Footer />
            <OnboardingTour />
          </Box>
        </FlightProvider>
      </OnboardingProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;