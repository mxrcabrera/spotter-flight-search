export const MAX_PASSENGERS = 9;
export const DEFAULT_DEPART_DAYS = 14;
export const DEFAULT_RETURN_DAYS = 21;
export const DEFAULT_MAX_PRICE = 5000;

export const CO2_PER_MINUTE = 2.5;
export const CO2_BASE_EMISSIONS = 100;

export const PRICE_LOW_THRESHOLD = 0.33;
export const PRICE_MID_THRESHOLD = 0.66;

export const SORT_OPTIONS = [
  { value: 'price', label: 'Cheapest', shortLabel: 'Best' },
  { value: 'duration', label: 'Duration: Shortest', shortLabel: 'Fastest' },
  { value: 'departure', label: 'Departure: Earliest', shortLabel: 'Earliest' }
];

export const CABIN_CLASS_OPTIONS = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium', label: 'Premium' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' }
];

export const STOPS_OPTIONS = [
  { value: 0, label: 'Direct' },
  { value: 1, label: '1 Stop' },
  { value: 2, label: '2 Stops' },
  { value: 3, label: '3+ Stops' }
];

export const MOBILE_STOPS_OPTIONS = [
  { value: 0, label: 'Nonstop only' },
  { value: 1, label: '1 stop or fewer' },
  { value: 2, label: '2 stops or fewer' }
];
