import { Box, Slider, FormControlLabel, Checkbox, Typography, Stack, Card, Button } from '@mui/material';
import { useMemo } from 'react';
import { useFlightContext } from '../../context/FlightContext';

const FilterPanel = () => {
  const { flights, filters, updateFilters, resetFilters } = useFlightContext();

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
      backgroundColor: '#303134',
      border: '1px solid #3c4043',
      p: 2,
      boxShadow: 'none',
      height: 'fit-content',
      position: 'sticky',
      top: 20
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#e8eaed', fontWeight: 600 }}>
          Filters
        </Typography>
        <Button
          size="small"
          onClick={handleResetFilters}
          sx={{
            color: '#8ab4f8',
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
        <Typography variant="subtitle2" sx={{ color: '#9aa0a6', mb: 1 }}>
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Typography>
        <Slider
          range
          min={priceRange[0]}
          max={priceRange[1]}
          value={filters.priceRange}
          onChange={handlePriceChange}
          sx={{
            color: '#8ab4f8',
            '& .MuiSlider-thumb': {
              backgroundColor: '#8ab4f8',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#8ab4f8',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#3c4043',
            }
          }}
        />
      </Box>

      {/* Stops Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: '#9aa0a6', mb: 1 }}>
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
                    color: '#9aa0a6',
                    '&.Mui-checked': { color: '#8ab4f8' }
                  }}
                />
              }
              label={
                <Typography sx={{ color: '#e8eaed', fontSize: '14px' }}>
                  {stops === 0 ? 'Nonstop' : `${stops} Stop${stops > 1 ? 's' : ''}`}
                </Typography>
              }
            />
          ))}
        </Stack>
      </Box>

      {/* Airlines Filter */}
      <Box>
        <Typography variant="subtitle2" sx={{ color: '#9aa0a6', mb: 1 }}>
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
                    color: '#9aa0a6',
                    '&.Mui-checked': { color: '#8ab4f8' }
                  }}
                />
              }
              label={
                <Typography sx={{ color: '#e8eaed', fontSize: '14px' }}>
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
