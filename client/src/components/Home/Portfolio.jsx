import React from 'react';

function Portfolio({ portfolio }) {

  function profitRenderer(profit, percentChange) {
    if (profit < 0) {
      return (<td className="text-center text-red-400">{profit.toFixed(2)} ({percentChange.toFixed(2)}%)</td>)
    } else {
      return (<td className="text-center text-green-400">{profit.toFixed(2)} ({percentChange.toFixed(2)}%)</td>)
    }
  }

  return (
    <div className="mt-6">
      <div className="bg-zinc-700 rounded-t-xl pt-2.5 px-5 w-fit">
        <h2>Portfolio</h2>
      </div>
      <div className="bg-zinc-700 rounded-b-xl rounded-tr-xl px-3 py-5">
        <div className="max-h-96 overflow-auto">
          <table className="w-full mx-auto table-auto">
            <thead className="bg-zinc-600 sticky top-0">
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
                {portfolio.map((asset, index) => (
                  <tr key={index}className="border-t border-zinc-600 hover:bg-zinc-400">
                    <td className="py-2"><img src={asset.image} className="h-10 mx-auto" /></td>
                    <td className="text-center py-2">{asset.coin}<i className="block text-sm">{asset.acronym.toUpperCase()}</i></td>
                    <td className="text-center">${asset.value.toFixed(2)}<i className="block text-sm">{`${asset.quantity} ${asset.acronym.toUpperCase()}`}</i></td>
                    <td className="text-center">${asset.avg_entry.toLocaleString("en-US")}</td>
                    <td className="text-center">${asset.curr_price.toLocaleString("en-US")}</td>
                    {profitRenderer(asset.profit_loss, asset.percent_change)}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Portfolio;