import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const title = screen.getByText(/sec21::command line parser/i);
  expect(title).toBeInTheDocument();
});
