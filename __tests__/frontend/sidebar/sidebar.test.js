import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../../../client/src/components/Sidebar/Sidebar.jsx';
import { portfolioMockData, achivementsMock, tradeHist, userWatchMock } from '../mock/homeMockData.js';

test('renders sidebar navigation', () => {
  render(<Sidebar activePage='Home' tradeHistory={tradeHist} userWatchlist={userWatchMock} />);
  const sideNav = (screen.getByText(/market watch/i));
  expect(sideNav).toBeInTheDocument();
});
