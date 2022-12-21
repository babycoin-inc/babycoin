import React from 'react';

const MarketWatch = ({coins, handleCoinClick}) => {

  return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center">
          <thead className="border-b bg-zinc-700">
            <tr>
              <th className="text-lg font-medium text-white px-0 py-3">
              </th>
              <th className="text-lg font-medium text-white px-0 py-3 flex">
                Coin
              </th>
              <th className="text-lg font-medium text-white px-0 py-3">
                Price
              </th>
              <th className="text-lg font-medium text-white px-0 py-3">
                24h
              </th>
              <th className="text-lg font-medium text-white px-0 py-3">
                Mkt Cap
              </th>
            </tr>
          </thead>
          <tbody>
              {coins.map((coin, index) => (
                coin.acronym !== 'usd' ?
                <tr key={index} className="border-b bg-zinc-900 boder-gray-900 hover:bg-zinc-800">
                  <td className="text-lg text-white font-light">☆</td>
                  <td className="text-sm text-white font-light px-0 py-3 flex items-center">
                        <span className="inline-flex"><img className="w-7 object-center mr-2" src={coin.image} /></span>
                        <span href="#hover" className="no-underline hover:underline cursor-pointer" onClick={handleCoinClick}>
                          <span className="mr-1 text-base font-semibold">{coin.name}</span>
                          <span>{coin.acronym.toUpperCase()}</span>
                        </span>
                  </td>
                  <td className="text-sm text-white font-light px-0 py-3">{coin.latest_price}</td>
                </tr> :
                null
              ))}
          </tbody>
        </table>
    </div>
  );
}

export default MarketWatch;

// ★☆