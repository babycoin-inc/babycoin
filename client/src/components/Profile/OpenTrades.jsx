import React from 'react';

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
    <div className="border-2 border-zinc-700">
      <h2>Open Trades</h2>
      <table className="w-4/5 mx-auto border-collapse border-spacing-0 table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>P/L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={trade.coin + index}className="border-b-2 border-black">
              <td className="text-center">{trade.coin}<i className="block text-sm">{trade.symbol}</i></td>
              <td className="text-center">$300<i className="block text-sm">{`${trade.currAmount} ${trade.symbol}`}</i></td>
              <td className="text-center">{trade.purchase}</td>
              <td className="text-center">{trade.current}</td>
              <td className="text-center">{trade.profitloss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OpenTrades;