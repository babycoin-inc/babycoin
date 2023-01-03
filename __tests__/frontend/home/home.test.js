import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../../client/src/components/Home/Home.jsx';
import AchievementWidget from '../../../client/src/components/Home/AchievementWidget.jsx';
import Balance from '../../../client/src/components/Home/Balance.jsx';
import Portfolio from '../../../client/src/components/Home/Portfolio.jsx';
import TradeHistory from '../../../client/src/components/Home/TradeHistory.jsx';
import { portfolioMockData } from './portfolioMockData.js';

test('renders individual components on screen', () => {
  render(<Portfolio portfolio={portfolioMockData} />);

  const portfolio = (screen.getByText(/portfolio/i));
  expect(portfolio).toBeInTheDocument();
});