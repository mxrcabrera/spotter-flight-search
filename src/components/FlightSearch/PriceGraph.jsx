import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useFlightContext } from '../../context/FlightContext';

const PriceGraph = () => {
  const { filteredFlights } = useFlightContext();

  // Preparar datos para el gráfico usando filteredFlights
  const chartData = useMemo(() => {
    return filteredFlights
      .map((flight, index) => ({
        id: flight.id,
        name: `${flight.airline} ${flight.stops > 0 ? `${flight.stops}s` : 'D'}`,
        price: flight.price,
        airline: flight.airline,
        stops: flight.stops,
      }))
      .sort((a, b) => a.price - b.price);
  }, [filteredFlights]);

  if (chartData.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: '#9aa0a6' }}>
        <Typography>No hay datos para mostrar el gráfico</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: 300, 
      mt: 2, 
      mb: 3,
      backgroundColor: '#303134',
      p: 2,
      borderRadius: '8px',
      border: '1px solid #3c4043'
    }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#e8eaed' }}>
        Price Trends - Live Updates ({chartData.length} flights)
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3c4043" />
          <XAxis 
            dataKey="name" 
            stroke="#9aa0a6"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9aa0a6"
            style={{ fontSize: '12px' }}
            label={{ value: 'USD', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#202124',
              border: '1px solid #3c4043',
              borderRadius: '4px',
              color: '#e8eaed'
            }}
            formatter={(value) => `$${value}`}
            labelFormatter={(label) => `Flight: ${label}`}
          />
          <Legend 
            wrapperStyle={{ color: '#9aa0a6' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8ab4f8" 
            strokeWidth={2}
            dot={{ fill: '#8ab4f8', r: 4 }}
            activeDot={{ r: 6 }}
            name="Price (USD)"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PriceGraph;
