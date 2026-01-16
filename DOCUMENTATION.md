# Technical Documentation - Spotter Flight Search

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Components](#components)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Local Development](#local-development)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## Overview

Spotter Flight Search is a responsive flight search application that allows users to search for flights, filter results by multiple criteria, and visualize price trends in real-time. The application features a Google Flights-inspired design with dark/light mode support.

### Key Features

- Real-time flight search with origin, destination, dates, passengers, and cabin class
- Multi-criteria filtering: price range, number of stops, airlines
- Live price graph that updates instantly when filters change
- Responsive design optimized for desktop and mobile devices
- Dark/light mode toggle with system preference detection

---

## Architecture

### Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 19.1.1 |
| UI Library | Material-UI (MUI) | 7.3.7 |
| Charts | Recharts | 2.15.0 |
| HTTP Client | Axios | 1.13.2 |
| State Management | React Context API | - |
| Styling | Emotion (CSS-in-JS) | 11.14.x |

### Design Patterns

- **Context API** for global state management (flights, filters, search params)
- **Composition** over inheritance for component design
- **Container/Presentational** pattern for separating logic from UI
- **Custom hooks** for reusable stateful logic

---

## Project Structure

```
src/
├── components/
│   ├── FlightSearch/
│   │   ├── FilterPanel.jsx      # Price/stops/airline filters
│   │   ├── FlightCard.jsx       # Individual flight display
│   │   ├── FlightResults.jsx    # Results grid with sorting
│   │   ├── FlightSearch.jsx     # Search form
│   │   └── PriceGraph.jsx       # Recharts price visualization
│   └── Layout/
│       ├── Header.jsx           # Navigation bar with theme toggle
│       └── Footer.jsx           # Footer with links
├── context/
│   ├── FlightContext.js         # Global flight state and filters
│   └── ThemeContext.js          # Dark/light mode state
├── services/
│   └── amadeus.js               # Amadeus API integration
├── App.js                       # Root component with theme provider
├── index.js                     # Entry point
└── setupTests.js                # Jest configuration
```

---

## Components

### FlightSearch.jsx

Search form component with the following fields:
- Trip type toggle (Round trip / One way)
- Origin and destination inputs (IATA codes)
- Departure and return date pickers
- Passenger count selector (1-9)
- Cabin class selector (Economy, Premium, Business, First)

**Props:** None (uses FlightContext)

### FlightResults.jsx

Displays search results in a responsive grid layout:
- Left sidebar with FilterPanel (moves to bottom on mobile)
- Main content area with sorted flight cards
- Loading spinner during API calls
- Empty state when no flights match filters

**Sorting options:**
- Price: Low to High
- Price: High to Low
- Duration: Shortest
- Departure: Earliest

### FlightCard.jsx

Individual flight card with expandable details:
- Airline code badge
- Departure/arrival times with +1 day indicator
- Flight duration and route
- Number of stops with layover duration
- CO2 emissions estimate
- Price display

**Expanded view includes:**
- Departure date
- Airport names (from AIRPORT_NAMES lookup)
- Travel time
- Layover information (for connecting flights)

### FilterPanel.jsx

Multi-criteria filter panel:
- **Price Range:** Slider with dynamic min/max based on results
- **Stops:** Checkboxes for 0, 1, 2, 3+ stops
- **Airlines:** Dynamic checkbox list based on available airlines

All filters use AND logic (all conditions must match).

### PriceGraph.jsx

Recharts LineChart visualization:
- X-axis: Flight identifier (airline + stops indicator)
- Y-axis: Price in USD
- Updates in real-time when filters change
- Responsive container that adapts to screen width

---

## State Management

### FlightContext

Central state management using React Context API.

**State:**
```javascript
{
  searchParams: {
    origin: 'JFK',
    destination: 'LAX',
    departureDate: Date,
    returnDate: Date,
    passengers: 1,
    tripType: 'roundtrip',
    cabinClass: 'economy'
  },
  flights: [],           // Raw flight data
  filteredFlights: [],   // Computed from flights + filters
  isLoading: boolean,
  error: string | null,
  filters: {
    priceRange: [min, max],
    stops: [],           // Array of selected stop counts
    airlines: []         // Array of selected airline names
  }
}
```

**Key functions:**
- `updateSearchParams(params)` - Update search criteria
- `searchFlightsFromAPI(params)` - Fetch flights from Amadeus
- `updateFilters(filterType, value)` - Update a specific filter
- `resetFilters()` - Clear all filters

**Performance optimization:**
`filteredFlights` is computed using `useMemo` and only recalculates when `flights` or `filters` change.

### ThemeContext

Simple context for dark/light mode:
```javascript
{
  mode: 'dark' | 'light',
  setMode: function
}
```

---

## API Integration

### Amadeus Flight Search API

The application integrates with Amadeus for real flight data.

**Authentication:** OAuth2 Client Credentials flow
```
POST /v1/security/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
client_id={API_KEY}
client_secret={API_SECRET}
```

**Flight Search endpoint:**
```
GET /v2/shopping/flight-offers
Authorization: Bearer {access_token}

Parameters:
- originLocationCode: IATA code (e.g., JFK)
- destinationLocationCode: IATA code (e.g., LAX)
- departureDate: YYYY-MM-DD
- returnDate: YYYY-MM-DD (optional)
- adults: number
- travelClass: ECONOMY | PREMIUM_ECONOMY | BUSINESS | FIRST
- max: number of results
- currencyCode: USD
```

**Response transformation:**
The `transformAmadeusResponse` function maps Amadeus data to the internal flight format:
```javascript
{
  id: string,
  airlineCode: string,
  airline: string,        // Full airline name from lookup
  price: number,
  currency: string,
  stops: number,
  duration: number,       // In minutes
  departureTime: ISO string,
  arrivalTime: ISO string,
  originCode: string,
  destinationCode: string,
  operatedBy: string | null
}
```

**Fallback behavior:**
If the API is unavailable or returns no results, the application displays 20 mock flights with realistic data for demonstration purposes.

### CORS Proxy (Development)

In development mode, requests to Amadeus are proxied through `setupProxy.js`:
```javascript
'/amadeus-api' -> 'https://test.api.amadeus.com'
```

---

## Local Development

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Environment Variables

Create a `.env` file in the project root:
```
REACT_APP_AMADEUS_API_KEY=your_api_key
REACT_APP_AMADEUS_API_SECRET=your_api_secret
```

To obtain Amadeus credentials:
1. Register at https://developers.amadeus.com
2. Create a new application
3. Copy the API Key and API Secret

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

The development server runs at `http://localhost:3000`.

---

## Testing

### Test Setup

Tests use Jest and React Testing Library. Configuration in `package.json`:
```json
{
  "jest": {
    "transformIgnorePatterns": [
      "node_modules/(?!(axios)/)"
    ]
  }
}
```

The `setupTests.js` file includes:
- Jest DOM matchers
- ResizeObserver mock for Recharts compatibility

### Running Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage
```

### Current Test Coverage

- App renders correctly
- Search button is present
- Trip type toggle buttons are present

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Set the following in your deployment platform:
- `REACT_APP_AMADEUS_API_KEY`
- `REACT_APP_AMADEUS_API_SECRET`

### Build Output

Production build generates optimized static files in the `build/` directory:
- `static/js/main.[hash].js` - Application bundle (~274 KB gzipped)
- `static/css/main.[hash].css` - Styles (~263 B gzipped)

---

## Screenshots

[Screenshot: Search Form]
<!-- Add screenshot of the search form with all fields visible -->

[Screenshot: Results with Filters]
<!-- Add screenshot showing flight results with filter panel -->

[Screenshot: Price Graph]
<!-- Add screenshot of the price trend visualization -->

[Screenshot: Mobile View]
<!-- Add screenshot of responsive mobile layout -->

[Screenshot: Dark/Light Mode]
<!-- Add side-by-side comparison of both themes -->
