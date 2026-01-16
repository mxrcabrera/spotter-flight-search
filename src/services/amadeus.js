import axios from 'axios';

const IS_DEV = process.env.NODE_ENV === 'development';
const AMADEUS_BASE_URL = IS_DEV ? '/amadeus-api' : 'https://test.api.amadeus.com';
const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const MAX_RESULTS = 20;
const TOKEN_REFRESH_BUFFER_SECONDS = 60;

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!API_KEY || !API_SECRET) {
    throw new Error('Amadeus API credentials not configured');
  }

  const response = await axios.post(
    `${AMADEUS_BASE_URL}/v1/security/oauth2/token`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + (response.data.expires_in - TOKEN_REFRESH_BUFFER_SECONDS) * 1000;
  return accessToken;
};

const AIRLINE_NAMES = {
  AA: 'American Airlines',
  UA: 'United Airlines',
  DL: 'Delta Air Lines',
  WN: 'Southwest Airlines',
  AS: 'Alaska Airlines',
  B6: 'JetBlue Airways',
  NK: 'Spirit Airlines',
  F9: 'Frontier Airlines',
  G4: 'Allegiant Air',
  HA: 'Hawaiian Airlines',
  BA: 'British Airways',
  LH: 'Lufthansa',
  AF: 'Air France',
  KL: 'KLM',
  IB: 'Iberia',
  AZ: 'ITA Airways',
  EK: 'Emirates',
  QR: 'Qatar Airways',
  EY: 'Etihad Airways',
  TK: 'Turkish Airlines',
  SQ: 'Singapore Airlines',
  CX: 'Cathay Pacific',
  JL: 'Japan Airlines',
  NH: 'ANA',
  QF: 'Qantas',
  AC: 'Air Canada',
  AM: 'Aeromexico',
  LA: 'LATAM Airlines',
  AV: 'Avianca',
  CM: 'Copa Airlines',
};

const getAirlineName = (code) => AIRLINE_NAMES[code] || code;

const parseDuration = (isoDuration) => {
  if (!isoDuration) return 0;
  const match = isoDuration.match(/PT(\d+)H?(\d+)?M?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  return hours * 60 + minutes;
};

const transformAmadeusResponse = (amadeusData) => {
  if (!amadeusData?.data) return [];

  return amadeusData.data.map((offer, idx) => {
    const itinerary = offer.itineraries?.[0];
    const segments = itinerary?.segments || [];
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    return {
      id: `amadeus-${offer.id || idx}`,
      airlineCode: firstSegment?.carrierCode || 'XX',
      airline: getAirlineName(firstSegment?.carrierCode),
      price: parseFloat(offer.price?.total) || 0,
      currency: offer.price?.currency || 'USD',
      stops: segments.length - 1,
      duration: parseDuration(itinerary?.duration),
      departureTime: firstSegment?.departure?.at || new Date().toISOString(),
      arrivalTime: lastSegment?.arrival?.at || new Date().toISOString(),
      originCode: firstSegment?.departure?.iataCode || '',
      destinationCode: lastSegment?.arrival?.iataCode || '',
      operatedBy: firstSegment?.operating?.carrierCode
        ? getAirlineName(firstSegment.operating.carrierCode)
        : null,
    };
  });
};

const CABIN_CLASS_MAP = {
  economy: 'ECONOMY',
  premium: 'PREMIUM_ECONOMY',
  business: 'BUSINESS',
  first: 'FIRST',
};

export const searchFlights = async ({
  origin,
  destination,
  departDate,
  returnDate,
  passengers = 1,
  cabinClass = 'economy',
}) => {
  const token = await getAccessToken();

  const params = {
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: departDate,
    adults: passengers,
    travelClass: CABIN_CLASS_MAP[cabinClass] || 'ECONOMY',
    max: MAX_RESULTS,
    currencyCode: 'USD',
  };

  if (returnDate) {
    params.returnDate = returnDate;
  }

  const response = await axios.get(
    `${AMADEUS_BASE_URL}/v2/shopping/flight-offers`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return transformAmadeusResponse(response.data);
};
