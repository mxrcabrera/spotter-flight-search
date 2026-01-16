import { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Chip, Collapse, useTheme, useMediaQuery } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { formatTime, formatDuration, formatStops } from '../../utils/formatters';
import { CO2_PER_MINUTE, CO2_BASE_EMISSIONS } from '../../utils/constants';

const LAYOVER_DURATION_RATIO = 0.15;

const FlightCard = memo(function FlightCard({ flight, priceColor }) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const co2Emissions = useMemo(() => {
    return Math.round(CO2_BASE_EMISSIONS + (flight.duration * CO2_PER_MINUTE));
  }, [flight.duration]);

  const layoverDuration = useMemo(() => {
    if (flight.stops === 0) return null;
    return formatDuration(Math.round(flight.duration * LAYOVER_DURATION_RATIO));
  }, [flight.stops, flight.duration]);

  const displayPriceColor = priceColor || theme.palette.text.primary;
  const stopsText = formatStops(flight.stops);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  const flightDescription = `${flight.airlineCode}, ${formatTime(flight.departureTime)} - ${formatTime(flight.arrivalTime)}, ${formatDuration(flight.duration)} · ${stopsText}, $${flight.price}`;

  if (isMobile) {
    return (
      <Box
        onClick={() => setExpanded(!expanded)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        aria-label={flightDescription}
        sx={{
          py: 1.5,
          px: 0.5,
          borderBottom: 1,
          borderColor: 'divider',
          cursor: 'pointer',
          '&:active': { bgcolor: 'action.hover' },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: -2
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'text.secondary' }}>
              {flight.airlineCode}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {formatTime(flight.departureTime)}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>-</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {formatTime(flight.arrivalTime)}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
              {formatDuration(flight.duration)} · {stopsText}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: displayPriceColor }}>
              ${flight.price}
            </Typography>
          </Box>

          {expanded ? (
            <KeyboardArrowUp sx={{ fontSize: 20, color: 'text.secondary', flexShrink: 0 }} />
          ) : (
            <KeyboardArrowDown sx={{ fontSize: 20, color: 'text.secondary', flexShrink: 0 }} />
          )}
        </Box>

        <Collapse in={expanded}>
          <Box sx={{ mt: 1.5, pl: 5.5, pr: 1 }}>
            <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
              <Box>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Airline</Typography>
                <Typography sx={{ fontSize: 12 }}>{flight.airline}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Route</Typography>
                <Typography sx={{ fontSize: 12 }}>{flight.originCode} - {flight.destinationCode}</Typography>
              </Box>
              {flight.stops > 0 && (
                <Box>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Layover</Typography>
                  <Typography sx={{ fontSize: 12 }}>{layoverDuration}</Typography>
                </Box>
              )}
              <Box>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>CO2</Typography>
                <Typography sx={{ fontSize: 12 }}>{co2Emissions} kg</Typography>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    );
  }

  return (
    <Box
      data-tour="flight-card"
      onClick={() => setExpanded(!expanded)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={flightDescription}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        border: 1,
        borderColor: expanded ? 'primary.main' : 'divider',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': { borderColor: 'primary.light', boxShadow: 1 },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2
        }
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 1,
          borderColor: 'divider',
          flexShrink: 0
        }}>
          <Typography sx={{ color: 'text.primary', fontSize: 14, fontWeight: 700 }}>
            {flight.airlineCode}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
            <Typography sx={{ color: 'text.primary', fontSize: 18, fontWeight: 600 }}>
              {formatTime(flight.departureTime)}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>-</Typography>
            <Typography sx={{ color: 'text.primary', fontSize: 18, fontWeight: 600 }}>
              {formatTime(flight.arrivalTime)}
            </Typography>
          </Box>
          <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
            {flight.airline}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', minWidth: 90 }}>
          <Typography sx={{ color: 'text.primary', fontSize: 14, fontWeight: 500 }}>
            {formatDuration(flight.duration)}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
            {flight.originCode}-{flight.destinationCode}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', minWidth: 80 }}>
          <Chip
            label={flight.stops === 0 ? 'Direct' : stopsText}
            size="small"
            sx={{
              fontSize: 12,
              fontWeight: 600,
              bgcolor: flight.stops === 0 ? 'success.dark' : 'warning.dark',
              color: 'white'
            }}
          />
        </Box>

        <Box sx={{ textAlign: 'center', minWidth: 80 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
            {co2Emissions} kg
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right', minWidth: 100 }}>
          <Typography sx={{ color: displayPriceColor, fontSize: 20, fontWeight: 700 }}>
            ${flight.price}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
            round trip
          </Typography>
        </Box>

        {expanded ? (
          <KeyboardArrowUp sx={{ color: 'text.secondary' }} />
        ) : (
          <KeyboardArrowDown sx={{ color: 'text.secondary' }} />
        )}
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ px: 2.5, pb: 2.5, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 4, pt: 2 }}>
            <Box>
              <Typography sx={{ color: 'text.secondary', fontSize: 11, fontWeight: 600, mb: 0.5 }}>
                DEPARTURE
              </Typography>
              <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
                {new Date(flight.departureTime).toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric'
                })}
              </Typography>
            </Box>
            {flight.stops > 0 && (
              <Box>
                <Typography sx={{ color: 'text.secondary', fontSize: 11, fontWeight: 600, mb: 0.5 }}>
                  LAYOVER
                </Typography>
                <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
                  {layoverDuration}
                </Typography>
              </Box>
            )}
            <Box>
              <Typography sx={{ color: 'text.secondary', fontSize: 11, fontWeight: 600, mb: 0.5 }}>
                CO2 EMISSIONS
              </Typography>
              <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
                {co2Emissions} kg
              </Typography>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
});

FlightCard.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.string.isRequired,
    airlineCode: PropTypes.string.isRequired,
    airline: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stops: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    departureTime: PropTypes.string.isRequired,
    arrivalTime: PropTypes.string.isRequired,
    originCode: PropTypes.string.isRequired,
    destinationCode: PropTypes.string.isRequired
  }).isRequired,
  priceColor: PropTypes.string
};

export default FlightCard;
