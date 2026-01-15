import { Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState, useMemo } from 'react';
import FlightCard from './FlightCard';
import PriceGraph from './PriceGraph';
import FilterPanel from './FilterPanel';
import { useFlightContext } from '../../context/FlightContext';

const FlightResults = ({ shouldSearch }) => {
  const { filteredFlights } = useFlightContext();
  const [sortBy, setSortBy] = useState('price');

  const sortedFlights = useMemo(() => {
    return [...filteredFlights].sort((a, b) => {
      switch(sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'duration':
          return a.duration - b.duration;
        case 'departure':
          return new Date(a.departureTime) - new Date(b.departureTime);
        default:
          return 0;
      }
    });
  }, [filteredFlights, sortBy]);

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, py: 3 }}>
      {/* Price Trend Graph */}
      <PriceGraph />

      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} sm={12} md={3}>
          <FilterPanel />
        </Grid>

        {/* Results */}
        <Grid item xs={12} sm={12} md={9}>
          {filteredFlights.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" sx={{ color: '#9aa0a6' }}>
                No flights match your filters
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#9aa0a6' }}>
                  {filteredFlights.length} flights found
                </Typography>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel sx={{ color: '#9aa0a6' }}>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort by"
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{
                      color: '#e8eaed',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3c4043' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8ab4f8' },
                      '& .MuiSvgIcon-root': { color: '#9aa0a6' }
                    }}
                  >
                    <MenuItem value="price">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="duration">Duration: Shortest</MenuItem>
                    <MenuItem value="departure">Departure: Earliest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {sortedFlights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightResults;
