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
      <div className="bg-zinc-700 rounded-t-xl pt-2.5 px-5 w-fit">
        <h2>Trade History</h2>
      </div>
      <div className="bg-zinc-700 rounded-b-xl rounded-tr-xl px-2.5 py-4">
        <table className="w-full mx-auto table-auto">
          <thead className="bg-zinc-600">
            <tr>
              <th className="p-6"></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-500">
            {history.map((trade, index) => (
              <tr key={trade.coin + index} className="border-t border-zinc-600">
                <td className="py-2"><img src="https://toppng.com/uploads/preview/bitcoin-png-bitcoin-logo-transparent-background-11562933997uxok6gcqjp.png" className="h-10 mx-auto" /></td>
                <td className="text-center">{trade.coin}<i className="block text-sm">{trade.symbol}</i></td>
                <td className="text-center">{trade.amount}<i className="block text-sm">.{`${trade.currAmount} ${trade.symbol}`}</i></td>
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