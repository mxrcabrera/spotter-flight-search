/**
 * Format minutes to human readable duration string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration like "5h 30m"
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Format ISO date string to time in HH:MM format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time like "14:30"
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

/**
 * Format stops count to human readable string
 * @param {number} stops - Number of stops
 * @returns {string} Formatted stops like "Nonstop", "1 stop", "2 stops"
 */
export const formatStops = (stops) => {
  if (stops === 0) return 'Nonstop';
  return `${stops} stop${stops > 1 ? 's' : ''}`;
};

/**
 * Get today's date in YYYY-MM-DD format using local timezone
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

/**
 * Get a future date in YYYY-MM-DD format
 * @param {number} daysFromNow - Number of days from today
 * @returns {string} Future date
 */
export const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};
