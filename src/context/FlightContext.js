import { createContext, useState, useContext } from 'react';

const FlightContext = createContext();

export const useFlightContext = () => useContext(FlightContext);

export const FlightProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    passengers: 1,
    tripType: 'roundtrip',
    cabinClass: 'economy'
  });

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  return (
    <FlightContext.Provider value={{ searchParams, updateSearchParams }}>
      {children}
    </FlightContext.Provider>
  );
};