import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group number and team members', () => {
  render(<App />);

  // Check for correct group number
  expect(screen.getByText(/group 11/i)).toBeInTheDocument();

  // Check heading
  expect(screen.getByText(/team members:/i)).toBeInTheDocument();

  // Check team members
  expect(screen.getByText(/gurniaz singh/i)).toBeInTheDocument();
  expect(screen.getByText(/abbamilki, nesru/i)).toBeInTheDocument();
  expect(screen.getByText(/lafleur-brown, braydon/i)).toBeInTheDocument();
});