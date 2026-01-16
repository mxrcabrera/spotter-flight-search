import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { calculatePriceStats } from '../../utils/priceUtils';
import { formatStops } from '../../utils/formatters';

const PriceGraph = () => {
  const { filteredFlights } = useFlightContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const chartData = useMemo(() => {
    const sorted = [...filteredFlights].sort((a, b) => a.price - b.price);
    return sorted.map((flight) => ({
      id: flight.id,
      name: flight.airlineCode,
      price: flight.price,
      airline: flight.airline,
      stops: flight.stops,
    }));
  }, [filteredFlights]);

  const priceStats = useMemo(() => calculatePriceStats(filteredFlights), [filteredFlights]);

  if (chartData.length === 0 || !priceStats) {
    return null;
  }

  if (isMobile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          py: 1.5,
          px: 2,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
        role="region"
        aria-label="Price summary"
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: theme.palette.mode === 'dark' ? 'success.light' : 'success.main', fontSize: 16, fontWeight: 700 }} aria-label={`Lowest price: $${priceStats.min}`}>
            ${priceStats.min}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 10 }} aria-hidden="true">Low</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }} aria-label={`Average price: $${priceStats.avg}`}>
            ${priceStats.avg}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 10 }} aria-hidden="true">Avg</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: theme.palette.mode === 'dark' ? 'error.light' : 'error.main', fontSize: 16, fontWeight: 700 }} aria-label={`Highest price: $${priceStats.max}`}>
            ${priceStats.max}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 10 }} aria-hidden="true">High</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        mb: 3,
        bgcolor: 'background.paper',
        p: 2.5,
        borderRadius: 2,
        border: 1,
        borderColor: 'divider'
      }}
      role="region"
      aria-label="Price overview chart"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography component="h2" variant="h6" sx={{ color: 'text.primary' }}>
          Price Overview
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }} aria-label="Price statistics">
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: theme.palette.mode === 'dark' ? 'success.light' : 'success.main', fontSize: 18, fontWeight: 600 }} aria-label={`Lowest price: $${priceStats.min}`}>
              ${priceStats.min}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }} aria-hidden="true">Lowest</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: 'text.primary', fontSize: 18, fontWeight: 600 }} aria-label={`Average price: $${priceStats.avg}`}>
              ${priceStats.avg}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }} aria-hidden="true">Average</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: theme.palette.mode === 'dark' ? 'error.light' : 'error.main', fontSize: 18, fontWeight: 600 }} aria-label={`Highest price: $${priceStats.max}`}>
              ${priceStats.max}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }} aria-hidden="true">Highest</Typography>
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ left: 0, right: 20, top: 10, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              fontSize: 13,
              padding: '10px 14px'
            }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                const data = payload[0].payload;
                return `${data.airline} (${data.stops === 0 ? 'Direct' : formatStops(data.stops)})`;
              }
              return label;
            }}
          />
          <Bar dataKey="price" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={entry.id}
                fill={entry.price === priceStats.min
                  ? theme.palette.success.main
                  : theme.palette.primary.main}
                fillOpacity={entry.price === priceStats.min ? 1 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PriceGraph;
