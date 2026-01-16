import { AppBar, Toolbar, Typography, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import { DarkMode, LightMode, FlightTakeoff, HelpOutline } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';
import { useOnboarding } from '../../context/OnboardingContext';

const Header = () => {
  const { mode, setMode } = useThemeMode();
  const { startTour } = useOnboarding();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      component="header"
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 'none',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{
        minHeight: { xs: '56px', sm: '64px' },
        px: { xs: 1.5, sm: 2 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
          <FlightTakeoff
            sx={{
              color: 'primary.main',
              fontSize: { xs: 24, sm: 28 }
            }}
            aria-hidden="true"
          />
          <Typography
            component="h1"
            sx={{
              color: 'text.primary',
              fontSize: { xs: '18px', sm: '22px' },
              fontWeight: 600
            }}
          >
            {isMobile ? 'Spotter' : 'Spotter Flight Search'}
          </Typography>
        </Box>

        <IconButton
          onClick={startTour}
          size={isMobile ? 'medium' : 'large'}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
              bgcolor: 'action.hover'
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2
            }
          }}
          aria-label="Start guided tour"
        >
          <HelpOutline aria-hidden="true" />
        </IconButton>

        <IconButton
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          size={isMobile ? 'medium' : 'large'}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
              bgcolor: 'action.hover'
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2
            }
          }}
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={mode === 'dark'}
        >
          {mode === 'dark' ? <LightMode aria-hidden="true" /> : <DarkMode aria-hidden="true" />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
