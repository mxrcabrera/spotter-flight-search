import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useFlightContext } from '../../context/FlightContext';

const FlightSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { updateSearchParams } = useFlightContext();

  const [tripType, setTripType] = useState('roundtrip');
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('LAX');
  const [departDate, setDepartDate] = useState('2025-02-15');
  const [returnDate, setReturnDate] = useState('2025-02-22');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');

  const handleSwapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = () => {
    updateSearchParams({
      origin,
      destination,
      departDate,
      returnDate: tripType === 'roundtrip' ? returnDate : null,
      passengers,
      cabinClass
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: 'background.paper'
      }}
    >
      {/* Trip Type Toggle */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={tripType}
          exclusive
          onChange={(e, val) => val && setTripType(val)}
          size="small"
        >
          <ToggleButton value="roundtrip">Round trip</ToggleButton>
          <ToggleButton value="oneway">One way</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Search Fields */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        {/* Origin */}
        <TextField
          label="From"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          placeholder="JFK"
          sx={{ flex: 1, minWidth: 120 }}
          inputProps={{ maxLength: 3 }}
        />

        {/* Swap Button */}
        <Button
          onClick={handleSwapCities}
          sx={{ minWidth: 40, p: 1 }}
          variant="outlined"
        >
          <SwapHorizIcon />
        </Button>

        {/* Destination */}
        <TextField
          label="To"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          placeholder="LAX"
          sx={{ flex: 1, minWidth: 120 }}
          inputProps={{ maxLength: 3 }}
        />

        {/* Depart Date */}
        <TextField
          label="Depart"
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, minWidth: 140 }}
        />

        {/* Return Date */}
        {tripType === 'roundtrip' && (
          <TextField
            label="Return"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 140 }}
          />
        )}

        {/* Passengers */}
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Passengers</InputLabel>
          <Select
            value={passengers}
            label="Passengers"
            onChange={(e) => setPassengers(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Cabin Class */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Class</InputLabel>
          <Select
            value={cabinClass}
            label="Class"
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <MenuItem value="economy">Economy</MenuItem>
            <MenuItem value="premium">Premium Economy</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="first">First</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{
            height: 56,
            px: 4,
            borderRadius: 2,
            minWidth: isMobile ? '100%' : 'auto'
          }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default FlightSearch;
