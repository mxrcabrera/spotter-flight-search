# FlightContext - Ejemplo de Uso

## 1. Estructura del Context

```javascript
{
  // Búsqueda
  searchParams: {
    origin: string,
    destination: string,
    departureDate: Date,
    returnDate: Date,
    passengers: number,
    tripType: 'roundtrip' | 'oneway',
    cabinClass: 'economy' | 'business' | 'first'
  },

  // Vuelos
  flights: Flight[],           // Todos los vuelos (sin filtrar)
  filteredFlights: Flight[],   // Vuelos después de aplicar filtros (REACTIVO)
  isLoading: boolean,

  // Filtros activos
  filters: {
    priceRange: [min: number, max: number],  // ej: [0, 2500]
    stops: number[],                         // ej: [0, 1, 2]
    airlines: string[]                       // ej: ['AA', 'UA', 'DL']
  },

  // Funciones
  updateSearchParams(params),  // Actualizar búsqueda
  loadFlights(flights),        // Cargar vuelos
  updateFilters(type, value),  // Actualizar filtros
  resetFilters()               // Limpiar filtros
}
```

## 2. Ejemplo: Componente que actualiza filtros

```jsx
import { useFlightContext } from '../../context/FlightContext';
import { Box, Slider, Checkbox, Stack } from '@mui/material';

const FilterPanel = () => {
  const { filters, updateFilters, flights, filteredFlights } = useFlightContext();

  // Cambiar rango de precio
  const handlePriceChange = (event, newValue) => {
    updateFilters('priceRange', newValue);
    // filteredFlights se actualiza automáticamente en otros componentes
  };

  // Agregar/quitar stops
  const handleStopsChange = (stopValue) => {
    const newStops = filters.stops.includes(stopValue)
      ? filters.stops.filter(s => s !== stopValue)
      : [...filters.stops, stopValue];
    updateFilters('stops', newStops);
  };

  // Agregar/quitar aerolínea
  const handleAirlineChange = (airline) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    updateFilters('airlines', newAirlines);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Slider de precio */}
      <Slider
        range
        min={0}
        max={2500}
        value={filters.priceRange}
        onChange={handlePriceChange}
      />

      {/* Checkboxes de stops */}
      <Stack>
        {[0, 1, 2, 3].map(stops => (
          <Checkbox
            key={stops}
            checked={filters.stops.includes(stops)}
            onChange={() => handleStopsChange(stops)}
            label={stops === 0 ? 'Nonstop' : `${stops} stops`}
          />
        ))}
      </Stack>

      {/* Checkboxes de aerolíneas */}
      <Stack>
        {['AA', 'UA', 'DL', 'BA', 'LH', 'SW'].map(airline => (
          <Checkbox
            key={airline}
            checked={filters.airlines.includes(airline)}
            onChange={() => handleAirlineChange(airline)}
            label={airline}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FilterPanel;
```

## 3. Ejemplo: Componente que consume filteredFlights (Gráfico)

```jsx
import { useFlightContext } from '../../context/FlightContext';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const PriceGraph = () => {
  const { filteredFlights } = useFlightContext();

  // Prepara datos para el gráfico
  const chartData = filteredFlights.map(flight => ({
    name: `${flight.airline} ${flight.stops}s`,
    price: flight.price
  }));

  return (
    <LineChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Line dataKey="price" stroke="#8ab4f8" />
    </LineChart>
  );
  // El gráfico se re-renderiza automáticamente cuando filteredFlights cambia
};

export default PriceGraph;
```

## 4. Ejemplo: Componente que lista resultados

```jsx
import { useFlightContext } from '../../context/FlightContext';
import FlightCard from './FlightCard';
import { Box, Typography } from '@mui/material';

const FlightResults = () => {
  const { filteredFlights, isLoading } = useFlightContext();

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (filteredFlights.length === 0) return <Typography>Sin resultados</Typography>;

  return (
    <Box>
      <Typography>{filteredFlights.length} vuelos disponibles</Typography>
      {filteredFlights.map(flight => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </Box>
  );
  // Se actualiza automáticamente cuando filtredFlights cambia
};

export default FlightResults;
```

## 5. Cómo funciona el filtrado automático

```javascript
// En FlightContext.js, useMemo recalcula filteredFlights SOLO cuando:
const filteredFlights = useMemo(() => {
  // 1. flights cambia
  // 2. filters cambia

  return flights.filter(flight => {
    // Lógica AND: TODOS los filtros activos deben cumplirse
    const priceOk = flight.price >= filters.priceRange[0] && 
                    flight.price <= filters.priceRange[1];
    
    const stopsOk = filters.stops.length === 0 ||  // Si no hay seleccionados, OK
                    filters.stops.includes(flight.stops);
    
    const airlinesOk = filters.airlines.length === 0 ||  // Si no hay seleccionados, OK
                       filters.airlines.includes(flight.airline);
    
    return priceOk && stopsOk && airlinesOk;
  });
}, [flights, filters]);
```

## 6. Caso de uso: Cambiar filtro y ver cambios en tiempo real

```jsx
// Usuario acciona:
// 1. Mueve slider de precio a $300-$500
updateFilters('priceRange', [300, 500]);

// Resultado automático:
// ✅ filteredFlights se recalcula
// ✅ PriceGraph se re-renderiza (nuevo gráfico con menos datos)
// ✅ FlightResults se re-renderiza (nueva lista)
// ✅ Todo en tiempo real sin necesidad de re-cargar
```

## 7. Mock Data disponible

- **20 vuelos** con precios desde $280 hasta $2500
- **6 aerolíneas**: AA, UA, DL, BA, LH, SW
- **4 niveles de stops**: 0, 1, 2, 3
- **Horas de salida variadas**: 04:30 - 19:30

Todos los vuelos van de **JFK → LAX**.

---

## Estado: ✅ LISTO PARA PASO 2B

El Context está completamente funcional. El siguiente paso es conectar FilterPanel.jsx para que use este Context.
