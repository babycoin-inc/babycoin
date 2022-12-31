import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../../client/src/components/App.jsx';

test('renders the main app page', () => {
  render(<App />);
  expect(screen.getByText("Portfolio"))
});