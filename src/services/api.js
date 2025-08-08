import axios from 'axios';

const BASE_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';

export const searchFlights = async (params) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/searchFlights`,
    params: {
      origin: params.origin,
      destination: params.destination,
      date: params.date,
      returnDate: params.returnDate,
      adults: params.passengers,
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US',
      cabinClass: params.cabinClass
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Sky Scrapper API error:', error);
    throw new Error('Failed to fetch flights data');
  }
};

// Additional features for more details
export const getAirportAutocomplete = async (query) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/airportSearch`,
    params: { query },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Autocomplete error:', error);
    return [];
  }
};

export const getFlightDetails = async (flightId) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/flightDetails`,
    params: { flightId },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Flight details error:', error);
    return null;
  }
};