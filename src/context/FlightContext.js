import { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { searchFlights as searchAmadeusFlights } from '../services/amadeus';
import { DEFAULT_MAX_PRICE } from '../utils/constants';

const FlightContext = createContext();

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within FlightProvider');
  }
  return context;
};

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToISO = (minutes, dateString = '2024-01-15') => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return new Date(`${dateString}T${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`).toISOString();
};

const durationToMinutes = (durationStr) => {
  const match = durationStr.match(/(\d+)h\s*(\d+)m/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  return 0;
};
const MOCK_FLIGHTS = [
  // JFK -> LAX (Economy)
  { id: 'f1', airlineCode: 'AA', airline: 'American Airlines', price: 450, currency: 'USD', stops: 0, duration: durationToMinutes('5h 30m'), departureTime: minutesToISO(timeToMinutes('08:00')), arrivalTime: minutesToISO(timeToMinutes('13:30')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'economy' },
  { id: 'f2', airlineCode: 'UA', airline: 'United Airlines', price: 320, currency: 'USD', stops: 1, duration: durationToMinutes('7h 45m'), departureTime: minutesToISO(timeToMinutes('10:30')), arrivalTime: minutesToISO(timeToMinutes('19:15')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'economy' },
  { id: 'f3', airlineCode: 'DL', airline: 'Delta Air Lines', price: 380, currency: 'USD', stops: 1, duration: durationToMinutes('8h 20m'), departureTime: minutesToISO(timeToMinutes('06:15')), arrivalTime: minutesToISO(timeToMinutes('15:35')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'economy' },
  { id: 'f4', airlineCode: 'SW', airline: 'Southwest Airlines', price: 290, currency: 'USD', stops: 2, duration: durationToMinutes('10h 15m'), departureTime: minutesToISO(timeToMinutes('07:00')), arrivalTime: minutesToISO(timeToMinutes('18:15')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'economy' },
  // JFK -> LAX (Premium)
  { id: 'f5', airlineCode: 'BA', airline: 'British Airways', price: 720, currency: 'USD', stops: 0, duration: durationToMinutes('5h 15m'), departureTime: minutesToISO(timeToMinutes('14:00')), arrivalTime: minutesToISO(timeToMinutes('19:15')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'premium' },
  { id: 'f6', airlineCode: 'LH', airline: 'Lufthansa', price: 610, currency: 'USD', stops: 1, duration: durationToMinutes('8h 10m'), departureTime: minutesToISO(timeToMinutes('11:45')), arrivalTime: minutesToISO(timeToMinutes('20:55')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'premium' },
  // JFK -> LAX (Business)
  { id: 'f7', airlineCode: 'AA', airline: 'American Airlines', price: 1850, currency: 'USD', stops: 0, duration: durationToMinutes('5h 35m'), departureTime: minutesToISO(timeToMinutes('16:30')), arrivalTime: minutesToISO(timeToMinutes('22:05')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'business' },
  { id: 'f8', airlineCode: 'DL', airline: 'Delta Air Lines', price: 2100, currency: 'USD', stops: 0, duration: durationToMinutes('5h 20m'), departureTime: minutesToISO(timeToMinutes('12:00')), arrivalTime: minutesToISO(timeToMinutes('17:20')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'business' },
  { id: 'f9', airlineCode: 'UA', airline: 'United Airlines', price: 1890, currency: 'USD', stops: 0, duration: durationToMinutes('5h 25m'), departureTime: minutesToISO(timeToMinutes('18:45')), arrivalTime: minutesToISO(timeToMinutes('23:10')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'business' },
  // JFK -> LAX (First)
  { id: 'f10', airlineCode: 'BA', airline: 'British Airways', price: 3200, currency: 'USD', stops: 0, duration: durationToMinutes('5h 30m'), departureTime: minutesToISO(timeToMinutes('11:00')), arrivalTime: minutesToISO(timeToMinutes('16:30')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'first' },
  { id: 'f11', airlineCode: 'AA', airline: 'American Airlines', price: 2800, currency: 'USD', stops: 0, duration: durationToMinutes('5h 20m'), departureTime: minutesToISO(timeToMinutes('09:30')), arrivalTime: minutesToISO(timeToMinutes('14:50')), originCode: 'JFK', destinationCode: 'LAX', cabinClass: 'first' },

  // JFK -> MIA
  { id: 'f12', airlineCode: 'AA', airline: 'American Airlines', price: 180, currency: 'USD', stops: 0, duration: durationToMinutes('3h 00m'), departureTime: minutesToISO(timeToMinutes('07:00')), arrivalTime: minutesToISO(timeToMinutes('10:00')), originCode: 'JFK', destinationCode: 'MIA', cabinClass: 'economy' },
  { id: 'f13', airlineCode: 'DL', airline: 'Delta Air Lines', price: 210, currency: 'USD', stops: 0, duration: durationToMinutes('3h 10m'), departureTime: minutesToISO(timeToMinutes('14:00')), arrivalTime: minutesToISO(timeToMinutes('17:10')), originCode: 'JFK', destinationCode: 'MIA', cabinClass: 'economy' },
  { id: 'f14', airlineCode: 'UA', airline: 'United Airlines', price: 520, currency: 'USD', stops: 0, duration: durationToMinutes('3h 05m'), departureTime: minutesToISO(timeToMinutes('10:00')), arrivalTime: minutesToISO(timeToMinutes('13:05')), originCode: 'JFK', destinationCode: 'MIA', cabinClass: 'business' },
  { id: 'f15', airlineCode: 'AA', airline: 'American Airlines', price: 480, currency: 'USD', stops: 0, duration: durationToMinutes('3h 00m'), departureTime: minutesToISO(timeToMinutes('16:00')), arrivalTime: minutesToISO(timeToMinutes('19:00')), originCode: 'JFK', destinationCode: 'MIA', cabinClass: 'business' },

  // LAX -> SFO
  { id: 'f16', airlineCode: 'SW', airline: 'Southwest Airlines', price: 89, currency: 'USD', stops: 0, duration: durationToMinutes('1h 20m'), departureTime: minutesToISO(timeToMinutes('06:00')), arrivalTime: minutesToISO(timeToMinutes('07:20')), originCode: 'LAX', destinationCode: 'SFO', cabinClass: 'economy' },
  { id: 'f17', airlineCode: 'UA', airline: 'United Airlines', price: 110, currency: 'USD', stops: 0, duration: durationToMinutes('1h 25m'), departureTime: minutesToISO(timeToMinutes('12:00')), arrivalTime: minutesToISO(timeToMinutes('13:25')), originCode: 'LAX', destinationCode: 'SFO', cabinClass: 'economy' },
  { id: 'f18', airlineCode: 'AA', airline: 'American Airlines', price: 320, currency: 'USD', stops: 0, duration: durationToMinutes('1h 20m'), departureTime: minutesToISO(timeToMinutes('18:00')), arrivalTime: minutesToISO(timeToMinutes('19:20')), originCode: 'LAX', destinationCode: 'SFO', cabinClass: 'business' },

  // LAX -> JFK (reverse)
  { id: 'f19', airlineCode: 'DL', airline: 'Delta Air Lines', price: 420, currency: 'USD', stops: 0, duration: durationToMinutes('5h 15m'), departureTime: minutesToISO(timeToMinutes('08:00')), arrivalTime: minutesToISO(timeToMinutes('16:15')), originCode: 'LAX', destinationCode: 'JFK', cabinClass: 'economy' },
  { id: 'f20', airlineCode: 'AA', airline: 'American Airlines', price: 380, currency: 'USD', stops: 1, duration: durationToMinutes('7h 30m'), departureTime: minutesToISO(timeToMinutes('11:00')), arrivalTime: minutesToISO(timeToMinutes('21:30')), originCode: 'LAX', destinationCode: 'JFK', cabinClass: 'economy' },
  { id: 'f21', airlineCode: 'UA', airline: 'United Airlines', price: 1750, currency: 'USD', stops: 0, duration: durationToMinutes('5h 10m'), departureTime: minutesToISO(timeToMinutes('15:00')), arrivalTime: minutesToISO(timeToMinutes('23:10')), originCode: 'LAX', destinationCode: 'JFK', cabinClass: 'business' },

  // SFO -> JFK
  { id: 'f22', airlineCode: 'UA', airline: 'United Airlines', price: 350, currency: 'USD', stops: 0, duration: durationToMinutes('5h 30m'), departureTime: minutesToISO(timeToMinutes('07:00')), arrivalTime: minutesToISO(timeToMinutes('15:30')), originCode: 'SFO', destinationCode: 'JFK', cabinClass: 'economy' },
  { id: 'f23', airlineCode: 'DL', airline: 'Delta Air Lines', price: 390, currency: 'USD', stops: 1, duration: durationToMinutes('7h 45m'), departureTime: minutesToISO(timeToMinutes('10:00')), arrivalTime: minutesToISO(timeToMinutes('20:45')), originCode: 'SFO', destinationCode: 'JFK', cabinClass: 'economy' },
  { id: 'f24', airlineCode: 'AA', airline: 'American Airlines', price: 1650, currency: 'USD', stops: 0, duration: durationToMinutes('5h 20m'), departureTime: minutesToISO(timeToMinutes('14:00')), arrivalTime: minutesToISO(timeToMinutes('22:20')), originCode: 'SFO', destinationCode: 'JFK', cabinClass: 'business' },

  // MIA -> LAX
  { id: 'f25', airlineCode: 'AA', airline: 'American Airlines', price: 280, currency: 'USD', stops: 0, duration: durationToMinutes('5h 30m'), departureTime: minutesToISO(timeToMinutes('08:00')), arrivalTime: minutesToISO(timeToMinutes('11:30')), originCode: 'MIA', destinationCode: 'LAX', cabinClass: 'economy' },
  { id: 'f26', airlineCode: 'DL', airline: 'Delta Air Lines', price: 310, currency: 'USD', stops: 1, duration: durationToMinutes('7h 00m'), departureTime: minutesToISO(timeToMinutes('12:00')), arrivalTime: minutesToISO(timeToMinutes('17:00')), originCode: 'MIA', destinationCode: 'LAX', cabinClass: 'economy' },
];

const getDefaultDepartDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toISOString().split('T')[0];
};

const getDefaultReturnDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 21);
  return date.toISOString().split('T')[0];
};

export const FlightProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    origin: 'JFK',
    destination: 'LAX',
    departDate: getDefaultDepartDate(),
    returnDate: getDefaultReturnDate(),
    passengers: 1,
    tripType: 'roundtrip',
    cabinClass: 'economy'
  });

  const [flights, setFlights] = useState(() =>
    MOCK_FLIGHTS.filter(f => f.originCode === 'JFK' && f.destinationCode === 'LAX' && f.cabinClass === 'economy')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    priceRange: [0, DEFAULT_MAX_PRICE],
    stops: [],
    airlines: []
  });

  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      const priceMatch = flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1];
      const stopsMatch = filters.stops.length === 0 || filters.stops.includes(flight.stops);
      const airlinesMatch = filters.airlines.length === 0 || filters.airlines.includes(flight.airline);
      return priceMatch && stopsMatch && airlinesMatch;
    });
  }, [flights, filters]);

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  const filterMockFlights = (params) => {
    return MOCK_FLIGHTS.filter(flight => {
      const originMatch = flight.originCode === params.origin;
      const destMatch = flight.destinationCode === params.destination;
      const classMatch = flight.cabinClass === params.cabinClass;
      return originMatch && destMatch && classMatch;
    });
  };

  const searchFlightsFromAPI = useCallback(async (params) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchAmadeusFlights({
        origin: params.origin,
        destination: params.destination,
        departDate: params.departDate,
        returnDate: params.returnDate,
        passengers: params.passengers,
        cabinClass: params.cabinClass,
      });

      if (results && results.length > 0) {
        setFlights(results);
        const maxPrice = Math.max(...results.map(f => f.price));
        setFilters(prev => ({
          ...prev,
          priceRange: [0, Math.ceil(maxPrice / 100) * 100],
        }));
      } else {
        // API returned no results, use filtered mock data
        const mockResults = filterMockFlights(params);
        if (mockResults.length > 0) {
          setFlights(mockResults);
          const maxPrice = Math.max(...mockResults.map(f => f.price));
          setFilters(prev => ({
            ...prev,
            priceRange: [0, Math.ceil(maxPrice / 100) * 100],
          }));
          setError('Showing demo flights for this route.');
        } else {
          setFlights([]);
          setError('No flights found for this route and class combination.');
        }
      }
    } catch {
      // API error, use filtered mock data
      const mockResults = filterMockFlights(params);
      if (mockResults.length > 0) {
        setFlights(mockResults);
        const maxPrice = Math.max(...mockResults.map(f => f.price));
        setFilters(prev => ({
          ...prev,
          priceRange: [0, Math.ceil(maxPrice / 100) * 100],
        }));
        setError('Showing demo flights for this route.');
      } else {
        setFlights([]);
        setError('No flights found for this route and class combination.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateFilters = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, DEFAULT_MAX_PRICE],
      stops: [],
      airlines: []
    });
  };

  const value = {
    searchParams,
    updateSearchParams,
    searchFlightsFromAPI,
    flights,
    filteredFlights,
    isLoading,
    error,
    filters,
    updateFilters,
    resetFilters
  };

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
};
