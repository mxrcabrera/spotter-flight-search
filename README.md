# ✈️ Flight Search Engine

A responsive, real-time flight search application built with React and Material-UI. Features live-updating price graphs, intelligent filtering, and a modern dark-themed UI.

## 🚀 Live Demo

Deploy to Vercel: [Add link after deployment]

## 📸 Features

### ✨ Core Functionality
- **Real-time Search Form**: Origin, destination, dates, passengers, cabin class
- **Advanced Filtering**: 
  - Price range slider with min/max calculation
  - Stops filter (0, 1, 2, 3+ stops)
  - Airline selector with dynamic options
  - AND logic (all filters apply simultaneously)
- **Live Price Graph**: Recharts line chart updates instantly when filters change
- **Responsive Design**: Fully functional on mobile (< 768px) and desktop
- **Modern UI**: Material-UI components with custom dark theme

## 💻 Tech Stack

- **React 19.1.1**: Latest React with hooks
- **Material-UI 7.3.1**: UI components with dark theme
- **Recharts 2.12.0**: Data visualization
- **Context API**: Global state management with useMemo optimization
- **date-fns**: Date handling utilities

## 📦 Installation & Quick Start

```bash
# Clone and install
git clone https://github.com/[username]/spotter-flight-search.git
cd spotter-flight-search
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🏛️ Project Architecture

**Global State Management** (FlightContext.js):
- 20 mock flights with varied prices ($280-$2,500) and stops (0-3)
- Automatic filtering with AND logic
- useMemo optimization for performance

**Key Components**:
- `FilterPanel.jsx`: Price/Stops/Airline filters
- `PriceGraph.jsx`: Live Recharts visualization  
- `FlightResults.jsx`: Results layout with sidebar
- `FlightSearch.jsx`: Search form with date pickers

## 🎯 Challenge Requirements - ALL COMPLETE ✅

| Feature | Status |
|---------|--------|
| Search & Results Form | ✅ |
| Live Price Graph | ✅ |
| Complex Filtering (Price + Stops + Airline) | ✅ |
| Real-time Updates | ✅ |
| Responsive Design | ✅ |

## 🚀 Deployment

Ready for Vercel with `vercel.json` configuration.

```bash
vercel deploy
```

---

**Built with ❤️ using React, Material-UI, and Recharts**


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
