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
    <div>
      <div className="bg-zinc-800 rounded-t-xl py-3 px-5 w-fit">
        <h2>Trade History</h2>
      </div>
      <div className="bg-zinc-800 rounded-b-xl rounded-tr-xl py-6">
        <table className="w-full mx-auto border-collapse border-spacing-0 table-auto">
          <thead>
            <tr>
              <th></th>
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
                <td><img src="https://toppng.com/uploads/preview/bitcoin-png-bitcoin-logo-transparent-background-11562933997uxok6gcqjp.png" className="h-10 mx-auto" /></td>
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
    </div>
  )
}

export default TradeHistory;