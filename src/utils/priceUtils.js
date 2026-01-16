import { PRICE_LOW_THRESHOLD, PRICE_MID_THRESHOLD } from './constants';

/**
 * Calculate price statistics from a list of flights
 * @param {Array} flights - Array of flight objects with price property
 * @returns {Object|null} Object with min, max, avg or null if empty
 */
export const calculatePriceStats = (flights) => {
  if (!flights || flights.length === 0) return null;

  const prices = flights.map(f => f.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  };
};

/**
 * Get color for price based on relative position in range
 * @param {number} price - The price to evaluate
 * @param {Object} priceStats - Object with min and max properties
 * @param {Object} palette - MUI theme palette
 * @returns {string} Color value
 */
export const getPriceColor = (price, priceStats, palette) => {
  if (!priceStats) return palette.text.primary;

  const isDark = palette.mode === 'dark';
  const range = priceStats.max - priceStats.min;
  if (range === 0) return isDark ? palette.success.light : palette.success.main;

  const ratio = (price - priceStats.min) / range;

  if (ratio < PRICE_LOW_THRESHOLD) return isDark ? palette.success.light : palette.success.main;
  if (ratio < PRICE_MID_THRESHOLD) return isDark ? palette.warning.light : palette.warning.main;
  return isDark ? palette.error.light : palette.error.main;
};
