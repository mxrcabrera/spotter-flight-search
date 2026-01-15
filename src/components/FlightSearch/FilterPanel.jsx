import { Box, Slider, FormControlLabel, Checkbox, Typography, Stack, Card, Button, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useFlightContext } from '../../context/FlightContext';

const FilterPanel = () => {
  const { flights, filters, updateFilters, resetFilters } = useFlightContext();
  const theme = useTheme();

  // Calcular valores únicos de aerolíneas dinámicamente
  const uniqueAirlines = useMemo(() => {
    const airlines = [...new Set(flights.map(f => f.airline))];
    return airlines.sort();
  }, [flights]);

  // Calcular rango de precios del máximo disponible
  const priceRange = useMemo(() => {
    if (flights.length === 0) return [0, 3000];
    const prices = flights.map(f => f.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max];
  }, [flights]);

  // Manejar cambio de rango de precio
  const handlePriceChange = (event, newValue) => {
    updateFilters('priceRange', newValue);
  };

  // Manejar cambio de stops
  const handleStopsChange = (stopValue) => {
    const newStops = filters.stops.includes(stopValue)
      ? filters.stops.filter(s => s !== stopValue)
      : [...filters.stops, stopValue];
    updateFilters('stops', newStops);
  };

  // Manejar cambio de aerolínea
  const handleAirlineChange = (airline) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    updateFilters('airlines', newAirlines);
  };

  // Manejar reset de filtros
  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      p: 2,
      boxShadow: 'none',
      height: 'fit-content',
      position: 'sticky',
      top: 20
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Filters
        </Typography>
        <Button
          size="small"
          onClick={handleResetFilters}
          sx={{
            color: theme.palette.primary.main,
            fontSize: '12px',
            textTransform: 'none',
            padding: 0,
            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
          }}
        >
          Clear all
        </Button>
      </Box>

      {/* Price Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Typography>
        <Slider
          range
          min={priceRange[0]}
          max={priceRange[1]}
          value={filters.priceRange}
          onChange={handlePriceChange}
          sx={{
            color: theme.palette.primary.main,
            '& .MuiSlider-thumb': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiSlider-track': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiSlider-rail': {
              backgroundColor: theme.palette.divider,
            }
          }}
        />
      </Box>

      {/* Stops Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          Number of Stops
        </Typography>
        <Stack spacing={0.5}>
          {[0, 1, 2, 3].map(stops => (
            <FormControlLabel
              key={stops}
              control={
                <Checkbox
                  checked={filters.stops.includes(stops)}
                  onChange={() => handleStopsChange(stops)}
                  sx={{
                    color: theme.palette.text.secondary,
                    '&.Mui-checked': { color: theme.palette.primary.main }
                  }}
                />
              }
              label={
                <Typography sx={{ color: theme.palette.text.primary, fontSize: '14px' }}>
                  {stops === 0 ? 'Nonstop' : `${stops} Stop${stops > 1 ? 's' : ''}`}
                </Typography>
              }
            />
          ))}
        </Stack>
      </Box>

      {/* Airlines Filter */}
      <Box>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          Airlines ({uniqueAirlines.length})
        </Typography>
        <Stack spacing={0.5}>
          {uniqueAirlines.map(airline => (
            <FormControlLabel
              key={airline}
              control={
                <Checkbox
                  checked={filters.airlines.includes(airline)}
                  onChange={() => handleAirlineChange(airline)}
                  sx={{
                    color: theme.palette.text.secondary,
                    '&.Mui-checked': { color: theme.palette.primary.main }
                  }}
                />
              }
              label={
                <Typography sx={{ color: theme.palette.text.primary, fontSize: '14px' }}>
                  {airline}
                </Typography>
              }
            />
          ))}
        </Stack>
      </Box>
    </Card>
  );
};

export default FilterPanel;
