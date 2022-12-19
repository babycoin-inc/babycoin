import React from 'react';

const MarketWatch = ({coins, handleCoinClick}) => {
  return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center">
          <thead className="border-b bg-zinc-700">
            <tr>
              <th scope="col" className="text-lg font-medium text-white ml-0 py-3">
                #
              </th>
              <th scope="col" className="text-lg font-medium text-white ml-0 py-3">
                image
              </th>
              <th scope="col" className="text-lg font-medium text-white ml-0 py-3">
                Coin
              </th>
              <th scope="col" className="text-lg font-medium text-white ml-0 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
              {coins.map((coin, index) => (
                <tr className="border-b bg-zinc-900 boder-gray-900 hover:bg-zinc-500">
                  <td className="text-sm text-white font-light  ml-0 py-3">{coin.id}</td>
                  <td className="text-sm text-white font-light  ml-0 py-3"><img className="w-8 object-center" src={coin.image} /></td>
                  <td className="text-sm text-white font-light  ml-0 py-3" onClick={handleCoinClick}>{coin.acronym}</td>
                  <td className="text-sm text-white font-light  ml-0 py-3">{coin.latest_price}</td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
}

export default MarketWatch;