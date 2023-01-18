import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Order from '../../../client/src/components/Trade/Order.jsx';
import { coins, portfolioMockData } from '../mock/orderMockData.js';

test('renders order component on screen', () => {
  render(<Order portfolio={portfolioMockData} authenticatedUser={1} coins={coins} symbol={'BTC'} />);
  const orderForm = screen.getAllByText('Buy');
  expect(orderForm[0]).toBeInTheDocument();
  expect(orderForm[1]).toBeInTheDocument();
});

test('renders correct amount of USD user has to screen', () => {
  render(<Order portfolio={portfolioMockData} authenticatedUser={1} coins={coins} symbol={'BTC'} />);
  const orderMessage = screen.getByText('You can buy up to $500');
  expect(orderMessage).toBeInTheDocument();
});

test('order form to take a text input', () => {
  render(<Order portfolio={portfolioMockData} authenticatedUser={1} coins={coins} symbol={'BTC'} />);
  fireEvent.change(screen.getByRole('textbox'), {
    target: {value: '100'}
  })
  expect(screen.getByRole('textbox').value).toBe('$100');
});

//OTHER TESTS TO IMPLEMENT IF HAVE MORE TIME

// test('sell button only renders coins that can be sold', () => {
//   render(<Order portfolio={portfolioMockData} authenticatedUser={1} coins={coins} symbol={'BTC'} setSymbol={() => 'ETH'}/>);
//   // screen.getByRole('');
//     // screen.debug();
//   // fireEvent.change(screen.getByText('Sell'), new MouseEvent('click', {
//   //   bubbles: true,
//   //   cancelable: true
//   // }))
//   fireEvent.click(screen.getByText('Sell'));
//   screen.debug();
// })

// test('sell all button renders maximum order amount', () => {
// });

// test('modal triggers when a coin is purchased', () => {
// });

