# Google Flights UI Clone

A React implementation of Google Flights UI created for Spotter's technical assessment.

## Implemented Components

- **Header**: Navigation bar with tabs for Travel, Explore, Flights, Hotels, and Vacation rentals
- **Flight Search**: Search form with From, To, Departs, and Return fields
- **Flight Results**: Display of flight options in a list format
- **Flight Cards**: Cards showing flight details with expandable sections
- **Footer**: Page footer with language, location, and currency options

## Tech Stack

- React.js
- Material-UI for component styling
- Context API for state management
- Structure prepared for API integration

## Project Structure

```
src/
├── components/
│   ├── FlightSearch/
│   │   ├── FlightCard.jsx
│   │   ├── FlightResults.jsx
│   │   └── FlightSearch.jsx
│   └── Layout/
│       ├── Footer.jsx
│       └── Header.jsx
├── context/
│   └── FlightContext.js
├── services/
│   └── api.js
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```

## Setup and Installation

1. Clone the repository
   ```
   git clone https://github.com/mxrcabrera/spotter-flight-search.git
   cd spotter-flight-search
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

## Implementation Details

This project implements a visual representation of Google Flights using React and Material-UI. It includes:

- Dark theme similar to Google Flights
- Basic component structure for flight search and results
- Context API for managing flight search parameters
- Sample flight data displayed in the UI
- Expandable flight cards to show additional details

The project was developed as part of a technical assessment for Spotter, with a time constraint of 16 hours.

---

Created by [Your Name] for Spotter technical assessment, August 2025.
