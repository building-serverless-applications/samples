import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component with Dashboard', () => {
  render(<App />);
  const dashboardContainer = screen.getByRole('main');
  expect(dashboardContainer).toBeInTheDocument();
});
