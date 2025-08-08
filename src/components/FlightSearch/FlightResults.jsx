import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, useMediaQuery, Link } from '@mui/material';
import FlightCard from './FlightCard';
import { TrendingFlat, KeyboardArrowDown, Info, SwapVert } from '@mui/icons-material';

const FlightResults = ({ shouldSearch }) => {
  
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [otherFlights, setOtherFlights] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0 = Best, 1 = Cheapest
  const [hasSearched, setHasSearched] = useState(false);

  const mockMainFlights = [
    {
      id: 1,
      airline: "LATAM, Iberia",
      airlineCode: "LA",
      operatedBy: "Operated by Latam Airlines Group, Latam Airlines Group, Air Nostrum for Latam Airlines Group",
      originCode: "AEP",
      destinationCode: "LHR",
      departureTime: "2025-08-13T15:40:00",
      arrivalTime: "2025-08-14T17:15:00",
      duration: 1275,
      stops: 2,
      price: 1482
    },
    {
      id: 2,
      airline: "LATAM, Iberia",
      airlineCode: "LA",
      operatedBy: "Operated by Latam Airlines Brasil, Latam Airlines Brasil",
      originCode: "AEP",
      destinationCode: "LHR",
      departureTime: "2025-08-13T14:55:00",
      arrivalTime: "2025-08-14T15:05:00",
      duration: 610,
      stops: 1,
      price: 1823
    },
    {
      id: 3,
      airline: "Gol, British Airways",
      airlineCode: "G3",
      operatedBy: null,
      originCode: "AEP",
      destinationCode: "LHR", 
      departureTime: "2025-08-13T10:20:00",
      arrivalTime: "2025-08-14T06:50:00",
      duration: 990,
      stops: 1,
      price: 1880
    }
  ];

  const mockOtherFlights = [
    {
      id: 4,
      airline: "Avianca",
      airlineCode: "AV",
      originCode: "AEP",
      destinationCode: "LHR",
      departureTime: "2025-08-13T07:00:00",
      arrivalTime: "2025-08-14T15:35:00",
      duration: 1715,
      stops: 1,
      price: 1810
    },
    {
      id: 5,
      airline: "LATAM, Iberia",
      airlineCode: "LA",
      operatedBy: "Operated by Latam Airlines Brasil, Latam Airlines Brasil",
      originCode: "AEP",
      destinationCode: "LHR",
      departureTime: "2025-08-13T14:55:00",
      arrivalTime: "2025-08-14T14:55:00",
      duration: 1200,
      stops: 2,
      price: 1895
    },
    {
      id: 6,
      airline: "LATAM, Air Europa",
      airlineCode: "LA",
      operatedBy: "Operated by Latam Airlines Brasil, Latam Airlines Brasil", 
      originCode: "AEP",
      destinationCode: "LGW",
      departureTime: "2025-08-13T11:45:00",
      arrivalTime: "2025-08-14T16:25:00",
      duration: 1480,
      stops: 3,
      price: 1932
    },
    {
      id: 7,
      airline: "LATAM, ITA",
      airlineCode: "LA",
      operatedBy: "Operated by Latam Airlines Brasil, Latam Airlines Brasil",
      originCode: "AEP",
      destinationCode: "LCY",
      departureTime: "2025-08-13T12:55:00",
      arrivalTime: "2025-08-14T21:05:00",
      duration: 1690,
      stops: 2,
      price: 1974
    }
  ];

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      setFlights(mockMainFlights);
      setOtherFlights(mockOtherFlights);
    } catch (error) {
      setError('Showing sample results');
      setFlights(mockMainFlights);
      setOtherFlights(mockOtherFlights);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldSearch) {
      setHasSearched(true);
      fetchFlights();
    }
  }, [shouldSearch]);

  useEffect(() => {
    if (!hasSearched) {
      setLoading(true);
      setTimeout(() => {
        setFlights(mockMainFlights);
        setOtherFlights(mockOtherFlights);
        setLoading(false);
        setHasSearched(true);
      }, 1000);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!hasSearched) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ color: '#e8eaed' }} gutterBottom>
          Search for flights to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
      {/* Filters Bar */}
      <Box sx={{ 
        display: 'flex', 
        overflowX: 'auto',
        mb: 2,
        gap: 1,
        alignItems: 'center',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        <Button
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          All filters
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          Stops
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          Airlines
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          Bags
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          Price
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          Times
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap',
            mr: 0.5
          }}
        >
          Emissions
        </Button>
        
        <Button
          endIcon={<KeyboardArrowDown fontSize="small" />}
          sx={{
            color: '#e8eaed',
            border: '1px solid #5f6368',
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            height: '32px',
            minWidth: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          Duration
        </Button>
      </Box>

      {/* Best/Cheapest Tabs */}
      <Box sx={{ 
        display: 'flex',
        mb: 3,
        overflow: 'hidden',
        borderRadius: '4px',
        border: '1px solid #5f6368'
      }}>
        {/* Best Tab */}
        <Box 
          onClick={() => handleTabChange(0)}
          sx={{ 
            flex: 1,
            backgroundColor: '#303134',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            borderRight: '1px solid #5f6368',
            '&:after': activeTab === 0 ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: '#1a73e8'
            } : {}
          }}
        >
          <Typography sx={{ 
            color: activeTab === 0 ? '#e8eaed' : '#9aa0a6', 
            fontSize: '14px', 
            fontWeight: activeTab === 0 ? 500 : 400 
          }}>
            Best
          </Typography>
          <Box sx={{ 
            width: '16px', 
            height: '16px', 
            ml: 0.5, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {activeTab === 0 && <Info sx={{ color: '#9aa0a6', fontSize: '14px' }} />}
          </Box>
        </Box>
        
        {/* Cheapest Tab */}
        <Box 
          onClick={() => handleTabChange(1)}
          sx={{ 
            flex: 1,
            backgroundColor: '#303134',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            '&:after': activeTab === 1 ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: '#1a73e8'
            } : {}
          }}
        >
          <Typography sx={{ 
            color: activeTab === 1 ? '#e8eaed' : '#9aa0a6', 
            fontSize: '14px',
            fontWeight: activeTab === 1 ? 500 : 400,
            mr: 0.5
          }}>
            Cheapest
          </Typography>
          <Typography sx={{ 
            color: '#9aa0a6', 
            fontSize: '14px' 
          }}>
            from $1,207
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={40} sx={{ color: '#8ab4f8' }} />
        </Box>
      ) : (
        <>
          {/* Main Flights Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1
            }}>
              <Typography variant="h6" sx={{ 
                color: '#e8eaed',
                fontSize: '18px',
                fontWeight: 400,
              }}>
                Top departing flights
              </Typography>
              
              <Button
                endIcon={<SwapVert sx={{ fontSize: 18 }} />}
                sx={{
                  color: '#8ab4f8',
                  textTransform: 'none',
                  fontSize: '14px',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sorted by top flights
              </Button>
            </Box>
            
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              mb: 2,
              color: '#9aa0a6',
              fontSize: '13px',
            }}>
              <Typography component="span" sx={{ 
                color: '#9aa0a6',
                fontSize: '13px',
                mr: 0.5
              }}>
                Ranking based on price and convenience.
              </Typography>
              <Typography component="span" sx={{ 
                color: '#9aa0a6',
                fontSize: '13px',
              }}>
                Prices include required taxes + fees for 1 adult. Optional charges and 
              </Typography>
              <Link 
                component="button" 
                sx={{ 
                  color: '#8ab4f8', 
                  fontSize: '13px',
                  textDecoration: 'underline',
                  mx: 0.5,
                  '&:hover': {
                    color: '#aecbfa'
                  }
                }}
              >
                bag fees
              </Link>
              <Typography component="span" sx={{ 
                color: '#9aa0a6',
                fontSize: '13px',
                mr: 0.5
              }}>
                may apply.
              </Typography>
              <Link 
                component="button" 
                sx={{ 
                  color: '#8ab4f8', 
                  fontSize: '13px',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#aecbfa'
                  }
                }}
              >
                Passenger assistance
              </Link>
            </Box>

            <Box sx={{ 
              backgroundColor: '#202124',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #3c4043'
            }}>
              {flights.map((flight, index) => (
                <FlightCard 
                  key={flight.id} 
                  flight={flight} 
                  priceColor="#4caf50"
                />
              ))}
            </Box>
          </Box>

          {/* Price tracking banner */}
          <Box sx={{ 
            mb: 4,
            p: 2, 
            backgroundColor: '#303134', 
            borderRadius: '8px',
            border: '1px solid #3c4043',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingFlat sx={{ mr: 2, color: '#9aa0a6' }} />
              <Typography sx={{ 
                color: '#e8eaed',
                fontSize: '14px'
              }}>
                Prices are staying about the same
              </Typography>
            </Box>
            <Button sx={{ 
              color: '#8ab4f8',
              textTransform: 'none',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: 'rgba(138, 180, 248, 0.1)'
              }
            }}>
              View price history
            </Button>
          </Box>

          {/* Other Flights Section */}
          <Box>
            <Typography variant="h6" sx={{ 
              color: '#e8eaed',
              fontSize: '18px',
              fontWeight: 400,
              mb: 3
            }}>
              Other departing flights
            </Typography>

            <Box sx={{ 
              backgroundColor: '#202124',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #3c4043'
            }}>
              {otherFlights.map((flight) => (
                <FlightCard 
                  key={flight.id} 
                  flight={flight} 
                  isOtherFlight={true} 
                  priceColor="#4caf50"
                />
              ))}
            </Box>

            {/* Show more flights */}
            <Box sx={{ 
              textAlign: 'center',
              mt: 3,
              pb: 2,
              borderBottom: '1px solid #3c4043'
            }}>
              <Button sx={{ 
                color: '#8ab4f8',
                textTransform: 'none',
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: 'rgba(138, 180, 248, 0.1)'
                }
              }}>
                Show more flights
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FlightResults;