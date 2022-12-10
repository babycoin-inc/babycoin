import React from 'react';

function TradeHistory({ tradeHistory }) {
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
            </tr>
          </thead>
          <tbody className="bg-zinc-500">
            {tradeHistory.map((trade, index) => (
              <tr key={trade.coin + index} className="border-t border-zinc-600  hover:bg-zinc-400">
                <td className="py-2"><img src={trade.image} className="h-10 mx-auto" /></td>
                <td className="text-center">{trade.name}<i className="block text-sm">{trade.acronym}</i></td>
                <td className="text-center">${Number(trade.total_trade_fiat).toFixed(2)}<i className="block text-sm">.{`${Number(trade.total_trade_coin).toFixed(2)} ${trade.acronym}`}</i></td>
                <td className="text-center">${Number(trade.purchase_price).toLocaleString("en-US")}</td>
                <td className="text-center">{trade.order_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TradeHistory;