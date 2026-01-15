import { Box, Typography, Grid } from '@mui/material';
import FlightCard from './FlightCard';
import PriceGraph from './PriceGraph';
import FilterPanel from './FilterPanel';
import { useFlightContext } from '../../context/FlightContext';

const FlightResults = ({ shouldSearch }) => {
  const { filteredFlights } = useFlightContext();

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
              <Typography variant="subtitle2" sx={{ color: '#9aa0a6', mb: 1 }}>
                {filteredFlights.length} flights found
              </Typography>
              {filteredFlights.map(flight => (
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
