import { createContext, useState, useContext, useMemo } from 'react';

const FlightContext = createContext();

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext debe usarse dentro de FlightProvider');
  }
  return context;
};

// Mock data con 20 vuelos variados
const MOCK_FLIGHTS = [
  {
    id: 'flight-1',
    airline: 'AA',
    airlineName: 'American Airlines',
    price: 450,
    currency: 'USD',
    stops: 0,
    duration: '5h 30m',
    departure: { time: '08:00', airport: 'JFK' },
    arrival: { time: '13:30', airport: 'LAX' }
  },
  {
    id: 'flight-2',
    airline: 'UA',
    airlineName: 'United Airlines',
    price: 320,
    currency: 'USD',
    stops: 1,
    duration: '7h 45m',
    departure: { time: '10:30', airport: 'JFK' },
    arrival: { time: '19:15', airport: 'LAX' }
  },
  {
    id: 'flight-3',
    airline: 'DL',
    airlineName: 'Delta Airlines',
    price: 380,
    currency: 'USD',
    stops: 1,
    duration: '8h 20m',
    departure: { time: '06:15', airport: 'JFK' },
    arrival: { time: '15:35', airport: 'LAX' }
  },
  {
    id: 'flight-4',
    airline: 'BA',
    airlineName: 'British Airways',
    price: 520,
    currency: 'USD',
    stops: 0,
    duration: '5h 15m',
    departure: { time: '14:00', airport: 'JFK' },
    arrival: { time: '19:15', airport: 'LAX' }
  },
  {
    id: 'flight-5',
    airline: 'LH',
    airlineName: 'Lufthansa',
    price: 410,
    currency: 'USD',
    stops: 1,
    duration: '8h 10m',
    departure: { time: '11:45', airport: 'JFK' },
    arrival: { time: '20:55', airport: 'LAX' }
  },
  {
    id: 'flight-6',
    airline: 'UA',
    airlineName: 'United Airlines',
    price: 280,
    currency: 'USD',
    stops: 2,
    duration: '10h 30m',
    departure: { time: '07:00', airport: 'JFK' },
    arrival: { time: '18:30', airport: 'LAX' }
  },
  {
    id: 'flight-7',
    airline: 'AA',
    airlineName: 'American Airlines',
    price: 550,
    currency: 'USD',
    stops: 0,
    duration: '5h 35m',
    departure: { time: '16:30', airport: 'JFK' },
    arrival: { time: '22:05', airport: 'LAX' }
  },
  {
    id: 'flight-8',
    airline: 'SW',
    airlineName: 'Southwest Airlines',
    price: 340,
    currency: 'USD',
    stops: 1,
    duration: '7h 55m',
    departure: { time: '09:15', airport: 'JFK' },
    arrival: { time: '18:10', airport: 'LAX' }
  },
  {
    id: 'flight-9',
    airline: 'DL',
    airlineName: 'Delta Airlines',
    price: 2100,
    currency: 'USD',
    stops: 0,
    duration: '5h 20m',
    departure: { time: '12:00', airport: 'JFK' },
    arrival: { time: '17:20', airport: 'LAX' }
  },
  {
    id: 'flight-10',
    airline: 'BA',
    airlineName: 'British Airways',
    price: 390,
    currency: 'USD',
    stops: 2,
    duration: '9h 45m',
    departure: { time: '05:30', airport: 'JFK' },
    arrival: { time: '16:15', airport: 'LAX' }
  },
  {
    id: 'flight-11',
    airline: 'LH',
    airlineName: 'Lufthansa',
    price: 360,
    currency: 'USD',
    stops: 1,
    duration: '8h 00m',
    departure: { time: '13:20', airport: 'JFK' },
    arrival: { time: '22:20', airport: 'LAX' }
  },
  {
    id: 'flight-12',
    airline: 'UA',
    airlineName: 'United Airlines',
    price: 1890,
    currency: 'USD',
    stops: 0,
    duration: '5h 25m',
    departure: { time: '18:45', airport: 'JFK' },
    arrival: { time: '23:10', airport: 'LAX' }
  },
  {
    id: 'flight-13',
    airline: 'AA',
    airlineName: 'American Airlines',
    price: 420,
    currency: 'USD',
    stops: 1,
    duration: '7h 40m',
    departure: { time: '10:00', airport: 'JFK' },
    arrival: { time: '18:40', airport: 'LAX' }
  },
  {
    id: 'flight-14',
    airline: 'SW',
    airlineName: 'Southwest Airlines',
    price: 300,
    currency: 'USD',
    stops: 2,
    duration: '10h 15m',
    departure: { time: '06:45', airport: 'JFK' },
    arrival: { time: '17:00', airport: 'LAX' }
  },
  {
    id: 'flight-15',
    airline: 'DL',
    airlineName: 'Delta Airlines',
    price: 475,
    currency: 'USD',
    stops: 1,
    duration: '8h 05m',
    departure: { time: '15:15', airport: 'JFK' },
    arrival: { time: '23:20', airport: 'LAX' }
  },
  {
    id: 'flight-16',
    airline: 'BA',
    airlineName: 'British Airways',
    price: 510,
    currency: 'USD',
    stops: 1,
    duration: '8h 30m',
    departure: { time: '11:00', airport: 'JFK' },
    arrival: { time: '20:30', airport: 'LAX' }
  },
  {
    id: 'flight-17',
    airline: 'LH',
    airlineName: 'Lufthansa',
    price: 2500,
    currency: 'USD',
    stops: 0,
    duration: '5h 15m',
    departure: { time: '19:30', airport: 'JFK' },
    arrival: { time: '23:45', airport: 'LAX' }
  },
  {
    id: 'flight-18',
    airline: 'UA',
    airlineName: 'United Airlines',
    price: 350,
    currency: 'USD',
    stops: 1,
    duration: '7h 50m',
    departure: { time: '08:45', airport: 'JFK' },
    arrival: { time: '17:35', airport: 'LAX' }
  },
  {
    id: 'flight-19',
    airline: 'AA',
    airlineName: 'American Airlines',
    price: 390,
    currency: 'USD',
    stops: 2,
    duration: '9h 20m',
    departure: { time: '04:30', airport: 'JFK' },
    arrival: { time: '14:50', airport: 'LAX' }
  },
  {
    id: 'flight-20',
    airline: 'SW',
    airlineName: 'Southwest Airlines',
    price: 320,
    currency: 'USD',
    stops: 1,
    duration: '7h 35m',
    departure: { time: '12:30', airport: 'JFK' },
    arrival: { time: '21:05', airport: 'LAX' }
  }
];

export const FlightProvider = ({ children }) => {
  // Estado de búsqueda
  const [searchParams, setSearchParams] = useState({
    origin: 'JFK',
    destination: 'LAX',
    departureDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    passengers: 1,
    tripType: 'roundtrip',
    cabinClass: 'economy'
  });

  // Estado de vuelos
  const [flights, setFlights] = useState(MOCK_FLIGHTS);
  const [isLoading, setIsLoading] = useState(false);

  // Estado de filtros
  const [filters, setFilters] = useState({
    priceRange: [0, 2500],
    stops: [],
    airlines: []
  });

  // Calcular filteredFlights automáticamente cuando cambien flights o filters
  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      // Filtro de precio
      const priceMatch = flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1];

      // Filtro de stops - si está vacío, incluir todos
      const stopsMatch = filters.stops.length === 0 || filters.stops.includes(flight.stops);

      // Filtro de aerolíneas - si está vacío, incluir todos
      const airlinesMatch = filters.airlines.length === 0 || filters.airlines.includes(flight.airline);

      // Todos deben cumplirse (AND logic)
      return priceMatch && stopsMatch && airlinesMatch;
    });
  }, [flights, filters]);

  // Actualizar parámetros de búsqueda
  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  // Cargar vuelos (simula una llamada a API)
  const loadFlights = (newFlights) => {
    setIsLoading(true);
    setTimeout(() => {
      setFlights(newFlights || MOCK_FLIGHTS);
      setIsLoading(false);
    }, 300);
  };

  // Actualizar un filtro específico
  const updateFilters = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Resetear todos los filtros
  const resetFilters = () => {
    setFilters({
      priceRange: [0, 2500],
      stops: [],
      airlines: []
    });
  };

  const value = {
    // Search
    searchParams,
    updateSearchParams,

    // Flights
    flights,
    filteredFlights,
    isLoading,
    loadFlights,

    // Filters
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