import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Apps, AccountCircle, DarkMode, LightMode } from '@mui/icons-material';

const Header = ({ mode, setMode }) => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: mode === 'dark' ? '#202124' : '#ffffff',
      boxShadow: 'none',
      borderBottom: mode === 'dark' ? '1px solid #3c4043' : '1px solid #dadce0',
      minHeight: '64px'
    }}>
      <Toolbar sx={{ 
        minHeight: '64px', 
        paddingLeft: 2,
        paddingRight: 2 
      }}>
        {/* Left side - Spotter Flight Search and navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography 
            component="div" 
            sx={{ 
              color: mode === 'dark' ? 'white' : '#202124',
              fontSize: '22px',
              fontWeight: 400,
              fontFamily: '"Product Sans", Arial, sans-serif',
              mr: 3
            }}
          >
            Spotter Flight Search
          </Typography>
          
          {/* Navigation tabs */}
          <Box sx={{ display: 'flex' }}>
            <Button sx={{ 
              color: mode === 'dark' ? '#9aa0a6' : '#5f6368', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: mode === 'dark' ? '#e8eaed' : '#202124',
                backgroundColor: 'transparent'
              }
            }}>
              Travel
            </Button>
            <Button sx={{ 
              color: mode === 'dark' ? '#9aa0a6' : '#5f6368', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: mode === 'dark' ? '#e8eaed' : '#202124',
                backgroundColor: 'transparent'
              }
            }}>
              Explore
            </Button>
            <Button sx={{ 
              color: mode === 'dark' ? '#e8eaed' : '#1a73e8', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderBottom: '3px solid #1a73e8',
              borderRadius: 0
            }}>
              Flights
            </Button>
            <Button sx={{ 
              color: mode === 'dark' ? '#9aa0a6' : '#5f6368', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: mode === 'dark' ? '#e8eaed' : '#202124',
                backgroundColor: 'transparent'
              }
            }}>
              Hotels
            </Button>
            <Button sx={{ 
              color: mode === 'dark' ? '#9aa0a6' : '#5f6368', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: mode === 'dark' ? '#e8eaed' : '#202124',
                backgroundColor: 'transparent'
              }
            }}>
              Vacation rentals
            </Button>
          </Box>
        </Box>
        
        {/* Right side - Theme toggle, Apps and Account */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            size="large" 
            sx={{ 
              color: mode === 'dark' ? '#9aa0a6' : '#5f6368',
              '&:hover': {
                color: mode === 'dark' ? '#e8eaed' : '#202124',
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
              }
            }}
            title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton size="large" sx={{ 
            color: mode === 'dark' ? '#9aa0a6' : '#5f6368',
            '&:hover': {
              color: mode === 'dark' ? '#e8eaed' : '#202124',
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }
          }}>
            <Apps />
          </IconButton>
          <IconButton size="large" sx={{ 
            color: mode === 'dark' ? '#9aa0a6' : '#5f6368',
            '&:hover': {
              color: mode === 'dark' ? '#e8eaed' : '#202124',
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }
          }}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;