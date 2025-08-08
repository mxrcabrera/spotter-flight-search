import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Apps, AccountCircle } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#202124',
      boxShadow: 'none',
      borderBottom: '1px solid #3c4043',
      minHeight: '64px'
    }}>
      <Toolbar sx={{ 
        minHeight: '64px', 
        paddingLeft: 2,
        paddingRight: 2 
      }}>
        {/* Left side - Google and navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography 
            component="div" 
            sx={{ 
              color: 'white',
              fontSize: '22px',
              fontWeight: 400,
              fontFamily: '"Product Sans", Arial, sans-serif',
              mr: 3
            }}
          >
            Google
          </Typography>
          
          {/* Navigation tabs */}
          <Box sx={{ display: 'flex' }}>
            <Button sx={{ 
              color: '#9aa0a6', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: '#e8eaed',
                backgroundColor: 'transparent'
              }
            }}>
              Travel
            </Button>
            <Button sx={{ 
              color: '#9aa0a6', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: '#e8eaed',
                backgroundColor: 'transparent'
              }
            }}>
              Explore
            </Button>
            <Button sx={{ 
              color: '#e8eaed', 
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
              color: '#9aa0a6', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: '#e8eaed',
                backgroundColor: 'transparent'
              }
            }}>
              Hotels
            </Button>
            <Button sx={{ 
              color: '#9aa0a6', 
              textTransform: 'none',
              fontSize: '14px',
              minHeight: '64px',
              px: 2,
              borderRadius: 0,
              '&:hover': {
                color: '#e8eaed',
                backgroundColor: 'transparent'
              }
            }}>
              Vacation rentals
            </Button>
          </Box>
        </Box>
        
        {/* Right side - Apps and Account */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="large" sx={{ 
            color: '#9aa0a6',
            '&:hover': {
              color: '#e8eaed',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}>
            <Apps />
          </IconButton>
          <IconButton size="large" sx={{ 
            color: '#9aa0a6',
            '&:hover': {
              color: '#e8eaed',
              backgroundColor: 'rgba(255,255,255,0.1)'
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