import { createContext, useState, useContext, useMemo } from 'react';

const FlightContext = createContext();

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext debe usarse dentro de FlightProvider');
  }
  return context;
};

// Función auxiliar para convertir HH:MM a minutos desde medianoche
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Función auxiliar para convertir minutos a ISO datetime string
const minutesToISO = (minutes, dateString = '2024-01-15') => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return new Date(`${dateString}T${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`).toISOString();
};

// Función auxiliar para convertir duración "Xh Ym" a minutos
const durationToMinutes = (durationStr) => {
  const match = durationStr.match(/(\d+)h\s*(\d+)m/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  return 0;
};

// Mock data con 20 vuelos variados
const MOCK_FLIGHTS = [
  {
    id: 'flight-1',
    airlineCode: 'AA',
    airline: 'American Airlines',
    price: 450,
    currency: 'USD',
    stops: 0,
    duration: durationToMinutes('5h 30m'),
    departureTime: minutesToISO(timeToMinutes('08:00')),
    arrivalTime: minutesToISO(timeToMinutes('13:30')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-2',
    airlineCode: 'UA',
    airline: 'United Airlines',
    price: 320,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('7h 45m'),
    departureTime: minutesToISO(timeToMinutes('10:30')),
    arrivalTime: minutesToISO(timeToMinutes('19:15')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-3',
    airlineCode: 'DL',
    airline: 'Delta Airlines',
    price: 380,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('8h 20m'),
    departureTime: minutesToISO(timeToMinutes('06:15')),
    arrivalTime: minutesToISO(timeToMinutes('15:35')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-4',
    airlineCode: 'BA',
    airline: 'British Airways',
    price: 520,
    currency: 'USD',
    stops: 0,
    duration: durationToMinutes('5h 15m'),
    departureTime: minutesToISO(timeToMinutes('14:00')),
    arrivalTime: minutesToISO(timeToMinutes('19:15')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-5',
    airlineCode: 'LH',
    airline: 'Lufthansa',
    price: 410,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('8h 10m'),
    departureTime: minutesToISO(timeToMinutes('11:45')),
    arrivalTime: minutesToISO(timeToMinutes('20:55')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-6',
    airlineCode: 'UA',
    airline: 'United Airlines',
    price: 280,
    currency: 'USD',
    stops: 2,
    duration: durationToMinutes('10h 30m'),
    departureTime: minutesToISO(timeToMinutes('07:00')),
    arrivalTime: minutesToISO(timeToMinutes('18:30')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-7',
    airlineCode: 'AA',
    airline: 'American Airlines',
    price: 550,
    currency: 'USD',
    stops: 0,
    duration: durationToMinutes('5h 35m'),
    departureTime: minutesToISO(timeToMinutes('16:30')),
    arrivalTime: minutesToISO(timeToMinutes('22:05')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-8',
    airlineCode: 'SW',
    airline: 'Southwest Airlines',
    price: 340,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('7h 55m'),
    departureTime: minutesToISO(timeToMinutes('09:15')),
    arrivalTime: minutesToISO(timeToMinutes('18:10')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-9',
    airlineCode: 'DL',
    airline: 'Delta Airlines',
    price: 2100,
    currency: 'USD',
    stops: 0,
    duration: durationToMinutes('5h 20m'),
    departureTime: minutesToISO(timeToMinutes('12:00')),
    arrivalTime: minutesToISO(timeToMinutes('17:20')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-10',
    airlineCode: 'BA',
    airline: 'British Airways',
    price: 390,
    currency: 'USD',
    stops: 2,
    duration: durationToMinutes('9h 45m'),
    departureTime: minutesToISO(timeToMinutes('05:30')),
    arrivalTime: minutesToISO(timeToMinutes('16:15')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-11',
    airlineCode: 'LH',
    airline: 'Lufthansa',
    price: 360,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('8h 00m'),
    departureTime: minutesToISO(timeToMinutes('13:20')),
    arrivalTime: minutesToISO(timeToMinutes('22:20')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-12',
    airlineCode: 'UA',
    airline: 'United Airlines',
    price: 1890,
    currency: 'USD',
    stops: 0,
    duration: durationToMinutes('5h 25m'),
    departureTime: minutesToISO(timeToMinutes('18:45')),
    arrivalTime: minutesToISO(timeToMinutes('23:10')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-13',
    airlineCode: 'AA',
    airline: 'American Airlines',
    price: 420,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('7h 40m'),
    departureTime: minutesToISO(timeToMinutes('10:00')),
    arrivalTime: minutesToISO(timeToMinutes('18:40')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-14',
    airlineCode: 'SW',
    airline: 'Southwest Airlines',
    price: 300,
    currency: 'USD',
    stops: 2,
    duration: durationToMinutes('10h 15m'),
    departureTime: minutesToISO(timeToMinutes('06:45')),
    arrivalTime: minutesToISO(timeToMinutes('17:00')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-15',
    airlineCode: 'DL',
    airline: 'Delta Airlines',
    price: 475,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('8h 05m'),
    departureTime: minutesToISO(timeToMinutes('15:15')),
    arrivalTime: minutesToISO(timeToMinutes('23:20')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-16',
    airlineCode: 'BA',
    airline: 'British Airways',
    price: 510,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('8h 30m'),
    departureTime: minutesToISO(timeToMinutes('11:00')),
    arrivalTime: minutesToISO(timeToMinutes('20:30')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-17',
    airlineCode: 'LH',
    airline: 'Lufthansa',
    price: 2500,
    currency: 'USD',
    stops: 0,
    duration: durationToMinutes('5h 15m'),
    departureTime: minutesToISO(timeToMinutes('19:30')),
    arrivalTime: minutesToISO(timeToMinutes('23:45')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-18',
    airlineCode: 'UA',
    airline: 'United Airlines',
    price: 350,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('7h 50m'),
    departureTime: minutesToISO(timeToMinutes('08:45')),
    arrivalTime: minutesToISO(timeToMinutes('17:35')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-19',
    airlineCode: 'AA',
    airline: 'American Airlines',
    price: 390,
    currency: 'USD',
    stops: 2,
    duration: durationToMinutes('9h 20m'),
    departureTime: minutesToISO(timeToMinutes('04:30')),
    arrivalTime: minutesToISO(timeToMinutes('14:50')),
    originCode: 'JFK',
    destinationCode: 'LAX'
  },
  {
    id: 'flight-20',
    airlineCode: 'SW',
    airline: 'Southwest Airlines',
    price: 320,
    currency: 'USD',
    stops: 1,
    duration: durationToMinutes('7h 35m'),
    departureTime: minutesToISO(timeToMinutes('12:30')),
    arrivalTime: minutesToISO(timeToMinutes('21:05')),
    originCode: 'JFK',
    destinationCode: 'LAX'
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
