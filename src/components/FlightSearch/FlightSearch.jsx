import { useState } from 'react';
import { Button, Typography, TextField, Box, Stack } from '@mui/material';
import { SwapHoriz, KeyboardArrowDown } from '@mui/icons-material';
import { useFlightContext } from '../../context/FlightContext';

const FlightSearch = ({ onSearch }) => {
  const { searchParams } = useFlightContext();
  const [localParams, setLocalParams] = useState(searchParams);

  return (
    <Box sx={{ 
      maxWidth: '1200px', 
      mx: 'auto', 
      px: 2, 
      mb: 2,
      position: 'relative'
    }}>
      {/* Top Row - Dropdowns */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            endIcon={<KeyboardArrowDown />}
            sx={{
              color: '#e8eaed',
              border: '1px solid #5f6368',
              borderRadius: '4px',
              textTransform: 'none',
              fontSize: '14px',
              px: 2,
              py: 0.5,
              minHeight: '36px',
              '&:hover': { borderColor: '#8ab4f8' }
            }}
          >
            Round trip
          </Button>
          <Button
            endIcon={<KeyboardArrowDown />}
            sx={{
              color: '#e8eaed',
              border: '1px solid #5f6368',
              borderRadius: '4px',
              textTransform: 'none',
              fontSize: '14px',
              px: 2,
              py: 0.5,
              minHeight: '36px',
              '&:hover': { borderColor: '#8ab4f8' }
            }}
          >
            1
          </Button>
          <Button
            endIcon={<KeyboardArrowDown />}
            sx={{
              color: '#e8eaed',
              border: '1px solid #5f6368',
              borderRadius: '4px',
              textTransform: 'none',
              fontSize: '14px',
              px: 2,
              py: 0.5,
              minHeight: '36px',
              '&:hover': { borderColor: '#8ab4f8' }
            }}
          >
            Economy
          </Button>
        </Box>
      </Box>

      {/* Search Form */}
      <Stack 
        direction="row" 
        spacing={1}
        alignItems="center"
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {/* From */}
        <Box sx={{ 
          flex: 1, 
          backgroundColor: '#202124',
          border: '1px solid #5f6368',
          borderRadius: '4px',
          p: 1.5,
          position: 'relative'
        }}>
          <Typography sx={{ 
            color: '#9aa0a6', 
            fontSize: '12px', 
            mb: 0.5 
          }}>
            From
          </Typography>
          <TextField
            variant="standard"
            placeholder="City or airport (e.g., JFK)"
            value={localParams.origin}
            onChange={(e) => setLocalParams(prev => ({...prev, origin: e.target.value}))}
            InputProps={{
              disableUnderline: true,
              sx: {
                color: '#e8eaed',
                fontSize: '16px',
                '& input::placeholder': { color: '#9aa0a6', opacity: 1 }
              }
            }}
            fullWidth
          />
          
          {/* Swap Button */}
          <Box sx={{
            position: 'absolute',
            right: -17,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}>
            <Box sx={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#3c4043',
              border: '1px solid #5f6368',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#444746' }
            }}>
              <SwapHoriz sx={{ color: '#e8eaed', fontSize: '18px' }} />
            </Box>
          </Box>
        </Box>

        {/* To */}
        <Box sx={{ 
          flex: 1, 
          backgroundColor: '#202124',
          border: '1px solid #5f6368',
          borderRadius: '4px',
          p: 1.5
        }}>
          <Typography sx={{ 
            color: '#9aa0a6', 
            fontSize: '12px', 
            mb: 0.5 
          }}>
            To
          </Typography>
          <TextField
            variant="standard"
            placeholder="City or airport (e.g., JFK)"
            value={localParams.destination}
            onChange={(e) => setLocalParams(prev => ({...prev, destination: e.target.value}))}
            InputProps={{
              disableUnderline: true,
              sx: {
                color: '#e8eaed',
                fontSize: '16px',
                '& input::placeholder': { color: '#9aa0a6', opacity: 1 }
              }
            }}
            fullWidth
          />
        </Box>

        {/* Departs */}
        <Box sx={{ 
          flex: 1, 
          backgroundColor: '#202124',
          border: '1px solid #5f6368',
          borderRadius: '4px',
          p: 1.5,
          cursor: 'pointer'
        }}>
          <Typography sx={{ 
            color: '#9aa0a6', 
            fontSize: '12px', 
            mb: 0.5 
          }}>
            Departs
          </Typography>
          <Typography sx={{ 
            color: '#e8eaed', 
            fontSize: '16px' 
          }}>
            Fri, Aug 8
          </Typography>
        </Box>

        {/* Return */}
        <Box sx={{ 
          flex: 1, 
          backgroundColor: '#202124',
          border: '1px solid #5f6368',
          borderRadius: '4px',
          p: 1.5,
          cursor: 'pointer'
        }}>
          <Typography sx={{ 
            color: '#9aa0a6', 
            fontSize: '12px', 
            mb: 0.5 
          }}>
            Return
          </Typography>
          <Typography sx={{ 
            color: '#e8eaed', 
            fontSize: '16px' 
          }}>
            Fri, Aug 15
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default FlightSearch;