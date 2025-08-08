import { useState } from 'react';
import { Box, Typography, Chip, Collapse } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const FlightCard = ({ flight, priceColor = "#4caf50" }) => {
  const [expanded, setExpanded] = useState(false);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'p.m.' : 'a.m.';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getAirlineColor = (code) => {
    return '#1a73e8';
  };
  
  return (
    <Box sx={{ 
      borderBottom: '1px solid #444746',
      '&:last-child': { borderBottom: 'none' }
    }}>
      {/* Main Card */}
      <Box sx={{ 
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: '#202124',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.04)'
        }
      }}
      onClick={() => setExpanded(!expanded)}
      >
        {/* Airline Logo */}
        <Box sx={{ 
          width: 40, 
          height: 40, 
          borderRadius: '50%',
          backgroundColor: getAirlineColor(flight.airlineCode),
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          mr: 3
        }}>
          <Typography sx={{ 
            color: 'white', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {flight.airlineCode}
          </Typography>
        </Box>

        {/* Flight Times & Info */}
        <Box sx={{ flex: 1, mr: 3 }}>
          <Typography sx={{ 
            color: '#e8eaed',
            fontSize: '16px',
            fontWeight: 400,
            mb: 0.5,
            display: 'flex',
            alignItems: 'center'
          }}>
            {formatTime(flight.departureTime)} – {formatTime(flight.arrivalTime)}
            <Typography component="span" sx={{ fontSize: '12px', color: '#9aa0a6', ml: 0.5 }}>
              +1
            </Typography>
          </Typography>
          <Typography sx={{ 
            color: '#9aa0a6',
            fontSize: '14px'
          }}>
            {flight.airline}
            {flight.operatedBy && ` • ${flight.operatedBy}`}
          </Typography>
        </Box>

        {/* Duration */}
        <Box sx={{ minWidth: '90px', mr: 3, textAlign: 'center' }}>
          <Typography sx={{ 
            color: '#e8eaed',
            fontSize: '14px',
            mb: 0.5
          }}>
            {formatDuration(flight.duration)}
          </Typography>
          <Typography sx={{ 
            color: '#9aa0a6',
            fontSize: '12px'
          }}>
            {flight.originCode} – {flight.destinationCode}
          </Typography>
        </Box>

        {/* Stops */}
        <Box sx={{ minWidth: '90px', mr: 3, textAlign: 'center' }}>
          <Typography sx={{ 
            color: '#e8eaed',
            fontSize: '14px',
            mb: 0.5
          }}>
            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </Typography>
          {flight.stops > 0 && (
            <Typography sx={{ 
              color: '#9aa0a6',
              fontSize: '12px'
            }}>
              2h 30min GRU
            </Typography>
          )}
        </Box>

        {/* CO2 */}
        <Box sx={{ minWidth: '120px', mr: 3, textAlign: 'center' }}>
          <Typography sx={{ 
            color: '#e8eaed',
            fontSize: '14px',
            mb: 0.5
          }}>
            {Math.floor(Math.random() * 300) + 600}kg de CO2e
          </Typography>
          <Chip 
            label="Avg emissions"
            size="small"
            sx={{ 
              fontSize: '11px', 
              height: '20px',
              backgroundColor: '#5f6368',
              color: '#e8eaed'
            }}
          />
        </Box>

        {/* Price */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ 
              color: priceColor,
              fontSize: '16px',
              fontWeight: 500
            }}>
              USD {flight.price.toLocaleString()}
            </Typography>
            <Typography sx={{ 
              color: '#9aa0a6',
              fontSize: '12px'
            }}>
              round trip
            </Typography>
          </Box>
          
          {/* Expand Arrow */}
          {expanded ? (
            <KeyboardArrowUp sx={{ color: '#9aa0a6' }} />
          ) : (
            <KeyboardArrowDown sx={{ color: '#9aa0a6' }} />
          )}
        </Box>
      </Box>

      {/* Expanded Details */}
      <Collapse in={expanded}>
        <Box sx={{ backgroundColor: '#202124', borderTop: '1px solid #444746' }}>
          {/* Departure Header */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: '#e8eaed', fontSize: '14px', fontWeight: 500, mr: 0.5 }}>
              Departure
            </Typography>
            <Typography sx={{ color: '#9aa0a6', fontSize: '14px' }}>
              • Wed, Aug 13
            </Typography>
          </Box>
          
          {/* First flight segment */}
          <Box sx={{ px: 2, pt: 1, pb: 2 }}>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Box sx={{ 
                minWidth: '40px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Box sx={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: getAirlineColor(flight.airlineCode),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                    {flight.airlineCode}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: '#9aa0a6', fontSize: '14px', ml: 1 }}>
                Travel time: 2h 20min
              </Typography>
            </Box>
            
            {/* Origin Airport */}
            <Box sx={{ display: 'flex', mb: 1, ml: 6 }}>
              <Typography sx={{ color: '#e8eaed', fontSize: '14px', minWidth: '80px' }}>
                3:40 p.m.
              </Typography>
              <Typography sx={{ color: '#9aa0a6', fontSize: '14px' }}>
                Aeropuerto Internacional Jorge Newbery (AEP)
              </Typography>
            </Box>
            
            {/* Destination Airport */}
            <Box sx={{ display: 'flex', mb: 1, ml: 6 }}>
              <Typography sx={{ color: '#e8eaed', fontSize: '14px', minWidth: '80px' }}>
                5:00 p.m.
              </Typography>
              <Typography sx={{ color: '#9aa0a6', fontSize: '14px' }}>
                Aeropuerto Internacional Arturo Merino Benítez (SCL)
              </Typography>
            </Box>
            
            {/* Airline details */}
            <Box sx={{ ml: 12, mb: 1 }}>
              <Typography sx={{ color: '#9aa0a6', fontSize: '12px' }}>
                LATAM • Tourist class • Airbus A320 • LA 454
              </Typography>
              <Typography sx={{ color: '#9aa0a6', fontSize: '12px' }}>
                Aircraft and crew by Latam Airlines Group
              </Typography>
            </Box>
          </Box>
          
          {/* Scale */}
          <Box sx={{ 
            py: 1.5,
            px: 2,
            backgroundColor: '#333',
            borderTop: '1px solid #444746',
            borderBottom: '1px solid #444746'
          }}>
            <Typography sx={{ color: '#e8eaed', fontSize: '14px' }}>
              2h stop • Santiago de Chile (SCL)
            </Typography>
          </Box>
          
          {/* Footer Details - Amenities */}
          <Box sx={{ 
            p: 2,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            borderTop: '1px solid #444746',
            mt: 1
          }}>
            <Typography sx={{ color: '#9aa0a6', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              🛋️ Little legroom (71 cm)
            </Typography>
            <Typography sx={{ color: '#9aa0a6', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              🔌 Seats with USB ports
            </Typography>
            <Typography sx={{ color: '#9aa0a6', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              📱 On-device entertainment
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default FlightCard;