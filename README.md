# Spotter Flight Search

A responsive flight search application with real-time filtering and price visualization. Search flights, filter by price/stops/airlines, and view price trends on an interactive graph.

**Live Demo:** [https://spotter-flight-search.netlify.app](https://spotter-flight-search.netlify.app)

## Tech Stack

- React 19.1.1
- Material-UI 7.3.7
- Recharts 2.15.0
- Axios 1.13.2
- Playwright (E2E Testing)
- Amadeus Flight API

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For API integration, create a `.env` file:
```
REACT_APP_AMADEUS_API_KEY=your_key
REACT_APP_AMADEUS_API_SECRET=your_secret
```

## Features

- **Search Form:** Origin, destination, dates, passengers, cabin class
- **Live Price Graph:** Real-time visualization that updates with filters
- **Advanced Filtering:** Price range slider, stops, airlines (AND logic)
- **Price Calendar:** 30-day price overview with color-coded pricing
- **Dark/Light Mode:** Theme toggle with system preference detection
- **Interactive Onboarding:** Guided tour for new users
- **Result Sorting:** By price, duration, or departure time
- **Responsive Design:** Optimized for desktop and mobile

## Documentation

See [DOCUMENTATION.md](DOCUMENTATION.md) for technical details including:
- Architecture and project structure
- Component documentation
- State management with Context API
- Amadeus API integration
- Deployment instructions

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run build` | Production build |

## License

MIT
