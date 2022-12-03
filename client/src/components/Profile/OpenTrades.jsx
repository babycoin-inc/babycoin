import React from 'react';
// import './profilestyles.css';

const trades = [
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    current: '$16,678',
    profitloss: '+$400'
  } ,
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    current: '$16,678',
    profitloss: '+$400'
  },
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    current: '$16,678',
    profitloss: '+$400'
  },
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    current: '$16,678',
    profitloss: '+$400'
  }
];

function OpenTrades() {
  return (
    <div className="h-52">
      <h2>Open Trades</h2>
      <table class="w-4/5 mx-auto border-collapse border-spacing-0 table-auto">
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Purchase Price</th>
          <th>Current Price</th>
          <th>P/L</th>
        </tr>
        {trades.map((trade) => (
          <tr class="border-b-2 border-black">
            <td class="text-center">{trade.coin}<i className="block text-sm">{trade.symbol}</i></td>
            <td class="text-center">$300<i className="block text-sm">{`${trade.currAmount} ${trade.symbol}`}</i></td>
            <td class="text-center">{trade.purchase}</td>
            <td class="text-center">{trade.current}</td>
            <td class="text-center">{trade.profitloss}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default OpenTrades;