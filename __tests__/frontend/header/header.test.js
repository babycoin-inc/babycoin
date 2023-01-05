import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../client/src/components/Header/Header.jsx';
import { portfolioMockData, achivementsMock, tradeHist } from '../mock/homeMockData.js';


test('renders header', () => {
  render(<Header activePage='Home' tradeHistory={tradeHist} />);
  const sideNav = (screen.getByText(/home/i));
  expect(sideNav).toBeInTheDocument();
});
