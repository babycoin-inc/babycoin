import React from 'react';

const MarketWatch = ({coins, handleCoinClick}) => {
  return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center">
          <thead className="border-b bg-zinc-700">
            <tr>
              <th scope="col" className="text-lg font-medium text-white px-1 py-3">
                #
              </th>
              <th scope="col" className="text-lg font-medium text-white px-1 py-3">
                Coin
              </th>
              <th scope="col" className="text-lg font-medium text-white px-1 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
              {coins.map((coin, index) => (
                <tr className="border-b bg-zinc-900 boder-gray-900 hover:bg-zinc-500">
                  <td className="text-sm text-white font-light px-1 py-3 whitespace-nowrap"><img className="w-8 object-center" src={coin.image} />{coin.id}</td>
                  <td className="text-sm text-white font-light px-1 py-3 whitespace-nowrap" onClick={handleCoinClick}>{coin.acronym}</td>
                  <td className="text-sm text-white font-light px-1 py-3 whitespace-nowrap">{coin.latest_price}</td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
}

export default MarketWatch;