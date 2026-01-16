import { render, screen } from '@testing-library/react';
import App from './App';

test('renders flight search header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Spotter Flight Search/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders search button', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /search/i });
  expect(searchButton).toBeInTheDocument();
});

test('renders trip type toggle', () => {
  render(<App />);
  const roundTripButton = screen.getByRole('button', { name: /round trip/i });
  const oneWayButton = screen.getByRole('button', { name: /one way/i });
  expect(roundTripButton).toBeInTheDocument();
  expect(oneWayButton).toBeInTheDocument();
});
