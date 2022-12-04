import React from 'react';

const history = [
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    order: 'BUY',
    balance: '$800'
  },
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    order: 'BUY',
    balance: '$800'
  },
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    order: 'BUY',
    balance: '$800'
  },
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '$300',
    currAmount: .023,
    purchase: '$15,698',
    order: 'BUY',
    balance: '$800'
  }
];

function TradeHistory() {
  return (
    <div className="bg-neutral-800 border-2 border-zinc-700 rounded">
      <h2>Trade History</h2>
      <table className="w-4/5 mx-auto border-collapse border-spacing-0 table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Type</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {history.map((trade, index) => (
            <tr key={trade.coin + index} className="border-b-2 border-black">
              <td className="text-center">{trade.coin}<i className="block text-sm">{trade.symbol}</i></td>
              <td className="text-center">{trade.amount}<i className="block text-sm">.{`${trade.amount} ${trade.symbol}`}</i></td>
              <td className="text-center">{trade.purchase}</td>
              <td className="text-center">{trade.order}</td>
              <td className="text-center">{trade.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TradeHistory;