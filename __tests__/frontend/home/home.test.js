import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../../client/src/components/Home/Home.jsx';
import AchievementWidget from '../../../client/src/components/Home/AchievementWidget.jsx';
import Balance from '../../../client/src/components/Home/Balance.jsx';
import Portfolio from '../../../client/src/components/Home/Portfolio.jsx';
import TradeHistory from '../../../client/src/components/Home/TradeHistory.jsx';
import { portfolioMockData, achivementsMock, tradeHist } from './homeMockData.js';

test('renders portfolio component on screen', () => {
  render(<Portfolio portfolio={portfolioMockData} />);
  const portfolio = (screen.getByText(/portfolio/i));
  expect(portfolio).toBeInTheDocument();
});

test('renders achievement widget component on screen', () => {
  render(<AchievementWidget userAchievements={achivementsMock} />);
  const achievement = (screen.getByText(/achievements/i));
  expect(achievement).toBeInTheDocument();
});

test('renders account balance on screen', () => {
  render(<Balance accountValue="500" profits="0" />);
  const balance = (screen.getByText(/account value/i));
  expect(balance).toBeInTheDocument();
});

test('renders trade history on screen', () => {
  render(<TradeHistory tradeHistory={tradeHist} />);
  const history = (screen.getByText(/trade history/i));
  expect(history).toBeInTheDocument();
});