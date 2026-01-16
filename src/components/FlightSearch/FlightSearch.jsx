import { useState, useMemo, useEffect } from 'react';
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
  useTheme,
  InputAdornment,
  IconButton,
  Typography,
  Tooltip,
  Collapse
} from '@mui/material';
import {
  Search as SearchIcon,
  SwapVert as SwapVertIcon,
  SwapHoriz as SwapHorizIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  AirlineSeatReclineNormal as AirlineSeatReclineNormalIcon,
  SyncAlt as SyncAltIcon,
  TrendingFlat as TrendingFlatIcon
} from '@mui/icons-material';
import { useFlightContext } from '../../context/FlightContext';
import { getTodayDate } from '../../utils/formatters';
import { MAX_PASSENGERS, CABIN_CLASS_OPTIONS } from '../../utils/constants';

const FlightSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { searchParams, updateSearchParams, searchFlightsFromAPI, isLoading } = useFlightContext();

  const [tripType, setTripType] = useState('roundtrip');
  const [origin, setOrigin] = useState(searchParams.origin);
  const [destination, setDestination] = useState(searchParams.destination);

  const today = useMemo(() => getTodayDate(), []);

  const [departDate, setDepartDate] = useState(searchParams.departDate);
  const [returnDate, setReturnDate] = useState(searchParams.returnDate);
  const [passengers, setPassengers] = useState(searchParams.passengers);
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass);

  useEffect(() => {
    setDepartDate(searchParams.departDate);
  }, [searchParams.departDate]);

  const passengerOptions = useMemo(() =>
    Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1),
    []
  );

  const handleSwapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearch = () => {
    const params = {
      origin,
      destination,
      departDate,
      returnDate: tripType === 'roundtrip' ? returnDate : null,
      passengers,
      cabinClass
    };
    updateSearchParams(params);
    searchFlightsFromAPI(params);
  };

  if (isMobile) {
    return (
      <Paper
        elevation={0}
        data-tour="search-form"
        sx={{
          borderRadius: 4,
          bgcolor: 'background.paper',
          overflow: 'hidden',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.4)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box sx={{ p: 2 }}>
          <ToggleButtonGroup
            value={tripType}
            exclusive
            onChange={(e, val) => val && setTripType(val)}
            size="small"
            fullWidth
            aria-label="Trip type"
            sx={{
              mb: 2,
              '& .MuiToggleButton-root': {
                flex: 1,
                borderRadius: 2,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                bgcolor: 'action.hover',
                gap: 0.75,
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 2
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }
              }
            }}
          >
            <ToggleButton value="roundtrip" aria-label="Round trip flight">
              <SyncAltIcon sx={{ fontSize: 18 }} />
              Round trip
            </ToggleButton>
            <ToggleButton value="oneway" aria-label="One way flight">
              <TrendingFlatIcon sx={{ fontSize: 18 }} />
              One way
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ position: 'relative', mb: 2 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderBottom: 1,
                borderColor: 'divider'
              }}>
                <FlightTakeoffIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1.5 }} aria-hidden="true" />
                <Box sx={{ flex: 1 }}>
                  <Typography component="label" htmlFor="origin-mobile" sx={{ color: 'text.secondary', fontSize: 11, mb: 0.25, display: 'block' }}>From</Typography>
                  <TextField
                    id="origin-mobile"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                    variant="standard"
                    placeholder="City or airport"
                    inputProps={{
                      maxLength: 3,
                      style: { fontSize: 16, fontWeight: 600, padding: 0 },
                      'aria-label': 'Origin airport code'
                    }}
                    sx={{ '& .MuiInput-underline:before, & .MuiInput-underline:after': { display: 'none' } }}
                    fullWidth
                  />
                </Box>
              </Box>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5
              }}>
                <FlightLandIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1.5 }} aria-hidden="true" />
                <Box sx={{ flex: 1 }}>
                  <Typography component="label" htmlFor="destination-mobile" sx={{ color: 'text.secondary', fontSize: 11, mb: 0.25, display: 'block' }}>To</Typography>
                  <TextField
                    id="destination-mobile"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value.toUpperCase())}
                    variant="standard"
                    placeholder="City or airport"
                    inputProps={{
                      maxLength: 3,
                      style: { fontSize: 16, fontWeight: 600, padding: 0 },
                      'aria-label': 'Destination airport code'
                    }}
                    sx={{ '& .MuiInput-underline:before, & .MuiInput-underline:after': { display: 'none' } }}
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            <IconButton
              onClick={handleSwapCities}
              aria-label="Swap origin and destination"
              sx={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                width: 36,
                height: 36,
                boxShadow: 1,
                '&:hover': { bgcolor: 'action.hover' },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 2
                }
              }}
            >
              <SwapVertIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: tripType === 'roundtrip' ? '1fr 1fr' : '1fr',
            gap: 1.5,
            mb: 2,
            transition: 'grid-template-columns 0.3s ease'
          }}>
            <Box sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              borderRadius: 2,
              p: 1.5
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: 16, mr: 1 }} aria-hidden="true" />
                <Typography component="label" htmlFor="depart-date-mobile" sx={{ color: 'text.secondary', fontSize: 11 }}>Depart</Typography>
              </Box>
              <TextField
                id="depart-date-mobile"
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                variant="standard"
                inputProps={{
                  min: today,
                  style: { fontSize: 14, fontWeight: 600, padding: 0 },
                  'aria-label': 'Departure date'
                }}
                sx={{ '& .MuiInput-underline:before, & .MuiInput-underline:after': { display: 'none' } }}
                fullWidth
              />
            </Box>

            <Collapse in={tripType === 'roundtrip'} orientation="horizontal" timeout={300}>
              <Box sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                borderRadius: 2,
                p: 1.5,
                minWidth: tripType === 'roundtrip' ? 'auto' : 0
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: 16, mr: 1 }} aria-hidden="true" />
                  <Typography component="label" htmlFor="return-date-mobile" sx={{ color: 'text.secondary', fontSize: 11 }}>Return</Typography>
                </Box>
                <TextField
                  id="return-date-mobile"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  variant="standard"
                  inputProps={{
                    min: departDate,
                    style: { fontSize: 14, fontWeight: 600, padding: 0 },
                    'aria-label': 'Return date'
                  }}
                  sx={{ '& .MuiInput-underline:before, & .MuiInput-underline:after': { display: 'none' } }}
                  fullWidth
                />
              </Box>
            </Collapse>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 2 }}>
            <FormControl size="small">
              <InputLabel id="travelers-label-mobile" sx={{ fontSize: 13 }}>Travelers</InputLabel>
              <Select
                labelId="travelers-label-mobile"
                value={passengers}
                label="Travelers"
                onChange={(e) => setPassengers(e.target.value)}
                sx={{ borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}
              >
                {passengerOptions.map((num) => (
                  <MenuItem key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel id="class-label-mobile" sx={{ fontSize: 13 }}>Class</InputLabel>
              <Select
                labelId="class-label-mobile"
                value={cabinClass}
                label="Class"
                onChange={(e) => setCabinClass(e.target.value)}
                sx={{ borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}
              >
                {CABIN_CLASS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
            fullWidth
            startIcon={<SearchIcon />}
            aria-busy={isLoading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: 15,
              textTransform: 'none',
              boxShadow: 'none',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark', boxShadow: 2 },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              }
            }}
          >
            {isLoading ? 'Searching...' : 'Search Flights'}
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      data-tour="search-form"
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
    >
      <Box sx={{ mb: 3 }} role="group" aria-label="Trip type selection">
        <ToggleButtonGroup
          value={tripType}
          exclusive
          onChange={(e, val) => val && setTripType(val)}
          size="small"
          aria-label="Trip type"
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              borderColor: 'divider',
              gap: 1,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              },
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' }
              }
            }
          }}
        >
          <Tooltip title="Search for outbound and return flights" arrow>
            <ToggleButton value="roundtrip" aria-label="Round trip flight">
              <SyncAltIcon sx={{ fontSize: 18 }} />
              Round trip
            </ToggleButton>
          </Tooltip>
          <Tooltip title="One-way ticket only" arrow>
            <ToggleButton value="oneway" aria-label="One way flight">
              <TrendingFlatIcon sx={{ fontSize: 18 }} />
              One way
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }} role="search" aria-label="Flight search form">
        <TextField
          label="From"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          placeholder="JFK"
          sx={{ flex: 1, minWidth: 120 }}
          inputProps={{ maxLength: 3, 'aria-label': 'Origin airport code' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightTakeoffIcon sx={{ color: 'text.secondary', fontSize: 20 }} aria-hidden="true" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={handleSwapCities}
          variant="outlined"
          aria-label="Swap origin and destination"
          sx={{
            minWidth: 48,
            height: 56,
            p: 0,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2
            }
          }}
        >
          <SwapHorizIcon />
        </Button>

        <TextField
          label="To"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          placeholder="LAX"
          sx={{ flex: 1, minWidth: 120 }}
          inputProps={{ maxLength: 3, 'aria-label': 'Destination airport code' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightLandIcon sx={{ color: 'text.secondary', fontSize: 20 }} aria-hidden="true" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Depart"
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today, 'aria-label': 'Departure date' }}
          sx={{ flex: 1, minWidth: 150 }}
        />

        <Collapse in={tripType === 'roundtrip'} orientation="horizontal" timeout={300}>
          <TextField
            label="Return"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: departDate, 'aria-label': 'Return date' }}
            sx={{ minWidth: 150, mr: tripType === 'roundtrip' ? 2 : 0 }}
          />
        </Collapse>

        <FormControl sx={{ minWidth: 110 }}>
          <InputLabel id="travelers-label">Travelers</InputLabel>
          <Select
            labelId="travelers-label"
            value={passengers}
            label="Travelers"
            onChange={(e) => setPassengers(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} aria-hidden="true" />
              </InputAdornment>
            }
          >
            {passengerOptions.map((num) => (
              <MenuItem key={num} value={num}>{num} {num === 1 ? 'traveler' : 'travelers'}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="class-label">Class</InputLabel>
          <Select
            labelId="class-label"
            value={cabinClass}
            label="Class"
            onChange={(e) => setCabinClass(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AirlineSeatReclineNormalIcon sx={{ color: 'text.secondary', fontSize: 20 }} aria-hidden="true" />
              </InputAdornment>
            }
          >
            {CABIN_CLASS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
            startIcon={<SearchIcon />}
            aria-busy={isLoading}
            sx={{
              height: 56,
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { boxShadow: 2 },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              }
            }}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FlightSearch;
