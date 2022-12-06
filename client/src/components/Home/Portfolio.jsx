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
    coin: 'Solana',
    symbol: 'SOL',
    amount: '$800',
    currAmount: .023,
    purchase: '$10',
    current: '$14',
    profitloss: '+$600'
  },
  {
    coin: 'Ethereum',
    symbol: 'ETH',
    amount: '$2000',
    currAmount: .023,
    purchase: '$900',
    current: '$1,200',
    profitloss: '+$400'
  },
  {
    coin: 'Dogecoin',
    symbol: 'DOGE',
    amount: '$1500',
    currAmount: .023,
    purchase: '$.006',
    current: '$.13',
    profitloss: '+$1200'
  }
];

function Portfolio() {
  return (
    <div>
      <div className="bg-zinc-700 rounded-t-xl pt-2.5 px-5 w-fit">
        <h2>Portfolio</h2>
      </div>
      <div className="bg-zinc-700 rounded-b-xl rounded-tr-xl px-2.5 py-4">
        <table className="w-full mx-auto table-auto">
          <thead className="bg-zinc-600">
            <tr>
              <th className="p-6"></th>
              <th>Name</th>
              <th>Value</th>
              <th>Avg. Entry</th>
              <th>Current Price</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-500">
            {trades.map((trade, index) => (
              <tr key={trade.coin + index}className="border-t border-zinc-600">
                <td className="py-2"><img src="https://toppng.com/uploads/preview/bitcoin-png-bitcoin-logo-transparent-background-11562933997uxok6gcqjp.png" className="h-10 mx-auto" /></td>
                <td className="text-center py-2">{trade.coin}<i className="block text-sm">{trade.symbol}</i></td>
                <td className="text-center">$300<i className="block text-sm">{`${trade.currAmount} ${trade.symbol}`}</i></td>
                <td className="text-center">{trade.purchase}</td>
                <td className="text-center">{trade.current}</td>
                <td className="text-center text-green-400">{trade.profitloss} (+5%)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Portfolio;