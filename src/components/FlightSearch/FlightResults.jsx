import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { useTheme, useMediaQuery } from '@mui/material';
import FlightCard from './FlightCard';
import FilterPanel from './FilterPanel';
import { useFlightContext } from '../../context/FlightContext';
import { calculatePriceStats, getPriceColor } from '../../utils/priceUtils';
import { SORT_OPTIONS } from '../../utils/constants';

const PriceGraph = lazy(() => import('./PriceGraph'));
const PriceCalendar = lazy(() => import('./PriceCalendar'));

const FlightResults = () => {
  const { filteredFlights, isLoading, error, filters, searchParams, updateSearchParams, searchFlightsFromAPI } = useFlightContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sortBy, setSortBy] = useState('price');

  const sortedFlights = useMemo(() => {
    return [...filteredFlights].sort((a, b) => {
      switch(sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration - b.duration;
        case 'departure':
          return new Date(a.departureTime) - new Date(b.departureTime);
        default:
          return 0;
      }
    });
  }, [filteredFlights, sortBy]);

  const priceStats = useMemo(() => calculatePriceStats(filteredFlights), [filteredFlights]);

  const getFlightPriceColor = useCallback((price) => {
    return getPriceColor(price, priceStats, theme.palette);
  }, [priceStats, theme.palette]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.stops.length > 0) count++;
    if (filters.airlines.length > 0) count++;
    return count;
  }, [filters]);

  const handleDateSelect = useCallback((newDate) => {
    const newParams = { ...searchParams, departDate: newDate };
    updateSearchParams(newParams);
    searchFlightsFromAPI(newParams);
  }, [searchParams, updateSearchParams, searchFlightsFromAPI]);

  if (isMobile) {
    return (
      <Box sx={{ pb: 2 }} role="region" aria-label="Flight search results">
        {error && (
          <Alert severity="info" sx={{ mx: 2, mb: 1, borderRadius: 2 }} role="status">
            {error}
          </Alert>
        )}

        <Suspense fallback={<Skeleton variant="rectangular" height={100} sx={{ mx: 2, mb: 2, borderRadius: 2 }} />}>
          <PriceGraph />
        </Suspense>

        <Suspense fallback={<Skeleton variant="rectangular" height={180} sx={{ mx: 2, mb: 2, borderRadius: 2 }} />}>
          <PriceCalendar onDateSelect={handleDateSelect} selectedDate={searchParams.departDate} />
        </Suspense>

        <Box sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
          px: 2,
          py: 1
        }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              pb: 0.5,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
            role="group"
            aria-label="Sort and filter options"
          >
            {SORT_OPTIONS.map(option => (
              <Chip
                key={option.value}
                label={option.shortLabel}
                size="small"
                onClick={() => setSortBy(option.value)}
                variant={sortBy === option.value ? 'filled' : 'outlined'}
                aria-pressed={sortBy === option.value}
                aria-label={`${option.shortLabel}: Sort by ${option.label}`}
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
                  ...(sortBy === option.value && {
                    bgcolor: 'primary.main',
                    color: 'white'
                  })
                }}
              />
            ))}
            <Box sx={{ width: 1, bgcolor: 'divider', mx: 0.5, flexShrink: 0 }} aria-hidden="true" />
            <FilterPanel />
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }} aria-busy="true" aria-label="Loading flights">
            <CircularProgress size={32} aria-label="Loading" />
          </Box>
        ) : filteredFlights.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }} role="status">
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
              No flights found
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            bgcolor: 'background.paper',
            mx: 2,
            mt: 1,
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <Box sx={{ px: 1.5, py: 1, borderBottom: 1, borderColor: 'divider' }}>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }} aria-live="polite">
                {filteredFlights.length} results {activeFiltersCount > 0 && `· ${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''}`}
              </Typography>
            </Box>
            <Box role="list" aria-label="Flight options">
              {sortedFlights.map(flight => (
                <Box key={flight.id} role="listitem">
                  <FlightCard
                    flight={flight}
                    priceColor={getFlightPriceColor(flight.price)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }} role="region" aria-label="Flight search results">
      {error && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }} role="status">
          {error}
        </Alert>
      )}

      <Suspense fallback={<Skeleton variant="rectangular" height={120} sx={{ mb: 3, borderRadius: 2 }} />}>
        <PriceGraph />
      </Suspense>

      <Suspense fallback={<Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />}>
        <PriceCalendar onDateSelect={handleDateSelect} selectedDate={searchParams.departDate} />
      </Suspense>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterPanel />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }} aria-busy="true">
              <CircularProgress size={48} aria-label="Loading flights" />
            </Box>
          ) : filteredFlights.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }} role="status">
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                No flights match your filters
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }} aria-live="polite">
                  {filteredFlights.length} flights found
                </Typography>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel id="sort-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortBy}
                    label="Sort by"
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{
                      fontSize: 14,
                      '& .MuiSelect-select': { py: 1 }
                    }}
                  >
                    {SORT_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box role="list" aria-label="Flight options">
                {sortedFlights.map(flight => (
                  <Box key={flight.id} role="listitem" sx={{ mb: 2 }}>
                    <FlightCard
                      flight={flight}
                      priceColor={getFlightPriceColor(flight.price)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightResults;
