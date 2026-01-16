import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Slider,
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  Button,
  Drawer,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { KeyboardArrowDown, Close } from '@mui/icons-material';
import { useFlightContext } from '../../context/FlightContext';
import { STOPS_OPTIONS, MOBILE_STOPS_OPTIONS, DEFAULT_MAX_PRICE } from '../../utils/constants';

const FilterPanel = () => {
  const { flights, filters, updateFilters, resetFilters } = useFlightContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [stopsDrawer, setStopsDrawer] = useState(false);
  const [airlinesDrawer, setAirlinesDrawer] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

  // Sync local state when context filters change (e.g., after new search)
  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const uniqueAirlines = useMemo(() => {
    const airlines = [...new Set(flights.map(f => f.airline))];
    return airlines.sort();
  }, [flights]);

  const priceRange = useMemo(() => {
    if (flights.length === 0) return [0, DEFAULT_MAX_PRICE];
    const prices = flights.map(f => f.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [flights]);

  const handlePriceChange = (event, newValue) => {
    setLocalPriceRange(newValue);
  };

  const handlePriceChangeCommitted = (event, newValue) => {
    updateFilters('priceRange', newValue);
  };

  const handleStopsChange = (stopValue) => {
    const newStops = filters.stops.includes(stopValue)
      ? filters.stops.filter(s => s !== stopValue)
      : [...filters.stops, stopValue];
    updateFilters('stops', newStops);
  };

  const handleAirlineChange = (airline) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    updateFilters('airlines', newAirlines);
  };

  const stopsLabel = useMemo(() => {
    if (filters.stops.length === 0) return 'Stops';
    if (filters.stops.length === 1) {
      return filters.stops[0] === 0 ? 'Nonstop' : `${filters.stops[0]} stop`;
    }
    return `${filters.stops.length} selected`;
  }, [filters.stops]);

  const airlinesLabel = useMemo(() => {
    if (filters.airlines.length === 0) return 'Airlines';
    if (filters.airlines.length === 1) return filters.airlines[0].split(' ')[0];
    return `${filters.airlines.length} airlines`;
  }, [filters.airlines]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.stops.length > 0) count += filters.stops.length;
    if (filters.airlines.length > 0) count += filters.airlines.length;
    if (filters.priceRange[0] > priceRange[0] || filters.priceRange[1] < priceRange[1]) count += 1;
    return count;
  }, [filters, priceRange]);

  const filterContent = (
    <>
      <Box sx={{ mb: 3 }} role="group" aria-labelledby="price-range-label">
        <Typography
          id="price-range-label"
          sx={{ color: 'text.secondary', fontSize: 13, fontWeight: 600, mb: 1.5 }}
        >
          Price Range
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            min={priceRange[0]}
            max={priceRange[1]}
            value={localPriceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceChangeCommitted}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `$${v}`}
            aria-label="Price range filter"
            getAriaValueText={(value) => `$${value}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>${localPriceRange[0]}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>${localPriceRange[1]}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }} role="group" aria-labelledby="stops-label">
        <Typography
          id="stops-label"
          sx={{ color: 'text.secondary', fontSize: 13, fontWeight: 600, mb: 1.5 }}
        >
          Stops
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {STOPS_OPTIONS.map(({ value, label }) => (
            <Chip
              key={value}
              label={label}
              onClick={() => handleStopsChange(value)}
              variant={filters.stops.includes(value) ? 'filled' : 'outlined'}
              aria-pressed={filters.stops.includes(value)}
              aria-label={`Filter by ${label}`}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 13,
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 2
                },
                ...(filters.stops.includes(value) && {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                })
              }}
            />
          ))}
        </Box>
      </Box>

      <Box role="group" aria-labelledby="airlines-label">
        <Typography
          id="airlines-label"
          sx={{ color: 'text.secondary', fontSize: 13, fontWeight: 600, mb: 1.5 }}
        >
          Airlines ({uniqueAirlines.length})
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          maxHeight: isMobile ? 'none' : 200,
          overflowY: isMobile ? 'visible' : 'auto'
        }}>
          {uniqueAirlines.map(airline => (
            <FormControlLabel
              key={airline}
              control={
                <Checkbox
                  checked={filters.airlines.includes(airline)}
                  onChange={() => handleAirlineChange(airline)}
                  size="small"
                  sx={{ p: 0.5 }}
                  inputProps={{ 'aria-label': `Filter by ${airline}` }}
                />
              }
              label={
                <Typography sx={{ fontSize: 14 }}>{airline}</Typography>
              }
              sx={{ ml: 0, mr: 0 }}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <>
        <Chip
          label={stopsLabel}
          size="small"
          onClick={() => setStopsDrawer(true)}
          deleteIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} aria-hidden="true" />}
          onDelete={() => setStopsDrawer(true)}
          variant={filters.stops.length > 0 ? 'filled' : 'outlined'}
          aria-haspopup="dialog"
          aria-expanded={stopsDrawer}
          aria-label={`Stops filter: ${stopsLabel}`}
          sx={{
            fontSize: 12,
            fontWeight: 500,
            height: 28,
            borderRadius: 2,
            flexShrink: 0,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2
            },
            ...(filters.stops.length > 0 && {
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiChip-deleteIcon': { color: 'white' }
            })
          }}
        />

        <Chip
          label={airlinesLabel}
          size="small"
          onClick={() => setAirlinesDrawer(true)}
          deleteIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} aria-hidden="true" />}
          onDelete={() => setAirlinesDrawer(true)}
          variant={filters.airlines.length > 0 ? 'filled' : 'outlined'}
          aria-haspopup="dialog"
          aria-expanded={airlinesDrawer}
          aria-label={`Airlines filter: ${airlinesLabel}`}
          sx={{
            fontSize: 12,
            fontWeight: 500,
            height: 28,
            borderRadius: 2,
            flexShrink: 0,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2
            },
            ...(filters.airlines.length > 0 && {
              bgcolor: 'primary.main',
              color: 'white',
              '& .MuiChip-deleteIcon': { color: 'white' }
            })
          }}
        />

        <Drawer
          anchor="bottom"
          open={stopsDrawer}
          onClose={() => setStopsDrawer(false)}
          PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
          aria-labelledby="stops-drawer-title"
        >
          <Box sx={{ p: 2 }} role="dialog" aria-modal="true">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography id="stops-drawer-title" sx={{ fontSize: 16, fontWeight: 600 }}>Stops</Typography>
              <IconButton
                onClick={() => setStopsDrawer(false)}
                size="small"
                aria-label="Close stops filter"
              >
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} role="group" aria-label="Stop options">
              {MOBILE_STOPS_OPTIONS.map(({ value, label }) => (
                <Chip
                  key={value}
                  label={label}
                  onClick={() => handleStopsChange(value)}
                  variant={filters.stops.includes(value) ? 'filled' : 'outlined'}
                  aria-pressed={filters.stops.includes(value)}
                  aria-label={`Filter by ${label}`}
                  sx={{
                    justifyContent: 'flex-start',
                    height: 40,
                    fontSize: 14,
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: 2
                    },
                    ...(filters.stops.includes(value) && {
                      bgcolor: 'primary.main',
                      color: 'white'
                    })
                  }}
                />
              ))}
            </Box>
            {filters.stops.length > 0 && (
              <Button
                fullWidth
                onClick={() => { updateFilters('stops', []); }}
                sx={{ mt: 2, textTransform: 'none' }}
                aria-label="Clear stops filter"
              >
                Clear
              </Button>
            )}
          </Box>
        </Drawer>

        <Drawer
          anchor="bottom"
          open={airlinesDrawer}
          onClose={() => setAirlinesDrawer(false)}
          PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '70vh' } }}
          aria-labelledby="airlines-drawer-title"
        >
          <Box sx={{ p: 2 }} role="dialog" aria-modal="true">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography id="airlines-drawer-title" sx={{ fontSize: 16, fontWeight: 600 }}>Airlines</Typography>
              <IconButton
                onClick={() => setAirlinesDrawer(false)}
                size="small"
                aria-label="Close airlines filter"
              >
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }} role="group" aria-label="Airline options">
              {uniqueAirlines.map(airline => (
                <FormControlLabel
                  key={airline}
                  control={
                    <Checkbox
                      checked={filters.airlines.includes(airline)}
                      onChange={() => handleAirlineChange(airline)}
                      size="small"
                      inputProps={{ 'aria-label': `Filter by ${airline}` }}
                    />
                  }
                  label={<Typography sx={{ fontSize: 14 }}>{airline}</Typography>}
                  sx={{ ml: 0 }}
                />
              ))}
            </Box>
            {filters.airlines.length > 0 && (
              <Button
                fullWidth
                onClick={() => { updateFilters('airlines', []); }}
                sx={{ mt: 2, textTransform: 'none' }}
                aria-label="Clear airlines filter"
              >
                Clear
              </Button>
            )}
          </Box>
        </Drawer>
      </>
    );
  }

  return (
    <Card
      data-tour="filters"
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        p: 2.5,
        boxShadow: 'none',
        height: 'fit-content',
        position: 'sticky',
        top: 20,
        borderRadius: 2
      }}
      role="region"
      aria-label="Flight filters"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h2" sx={{ fontSize: 18, fontWeight: 600 }}>Filters</Typography>
        {activeFiltersCount > 0 && (
          <Button
            size="small"
            onClick={resetFilters}
            sx={{ textTransform: 'none', fontSize: 13 }}
            aria-label={`Clear all ${activeFiltersCount} filters`}
          >
            Clear ({activeFiltersCount})
          </Button>
        )}
      </Box>

      {filterContent}
    </Card>
  );
};

export default FilterPanel;
