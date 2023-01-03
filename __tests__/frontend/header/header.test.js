import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../client/src/components/Header/Header.jsx';


test('renders header', () => {
  render(<Header activePage='Home' />);
  const sideNav = (screen.getByText(/home/i));
  expect(sideNav).toBeInTheDocument();
});
