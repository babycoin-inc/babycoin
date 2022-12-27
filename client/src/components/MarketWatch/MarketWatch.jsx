import React, {useEffect} from 'react';

const MarketWatch = ({coins, handleCoinClick, userWatchlist, toggleStars, authenticatedUser }) => {

  const prev_price = {};

  coins.map(coin => {
    prev_price[coin.name] = JSON.parse(window.localStorage.getItem(`previous price of ${coin.name} for the ${authenticatedUser}:`));
    useEffect(() => {
      window.localStorage.setItem(`previous price of ${coin.name} for the ${authenticatedUser}:`, JSON.stringify(coin.latest_price));
    }, [coin.latest_price]);
  });


  return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center table-auto">
          <thead className="border-b bg-zinc-700">
            <tr>
              <th className="text-lg font-medium text-white px-1 py-3 w-1/8">
              </th>
              <th className="text-lg font-medium text-white px-0 py-3 flex w-1/5">
                Coin
              </th>
              <th className="text-lg font-medium text-white px-0 py-3 w-1/5">
                Price
              </th>
              <th className="text-lg font-medium text-white px-0 py-3 w-1/5">
                24h
              </th>
              <th className="text-lg font-medium text-white px-0 py-3 w-1/6">
                Mkt Cap
              </th>
              <th className="text-lg font-medium text-white px-0 py-3 w-1/6">
                Graph
              </th>
            </tr>
          </thead>
          <tbody>
              {coins.map((coin, index) => (
                coin.acronym !== 'usd' ?
                <tr key={index} className="border-b bg-zinc-900 hover:bg-zinc-800">
                  {userWatchlist.includes(coin.name) ? <td className="text-lg text-yellow-600 font-light" onClick={toggleStars}>★</td> : <td className="text-lg text-white font-light" onClick={toggleStars}>☆</td>}
                  <td className="text-sm text-white font-light px-0 py-3 flex items-center">
                        <span className="inline-flex"><img className="w-7 object-center mr-2" src={coin.image}/></span>
                        <div href="#hover" className="no-underline hover:underline cursor-pointer" onClick={handleCoinClick}>
                          <span className="mr-1 text-base font-semibold">{coin.name}</span>
                          <span>{coin.acronym.toUpperCase()}</span>
                        </div>
                  </td>
                  { prev_price[coin.name] > coin.latest_price ? <td className="text-sm text-red-600 font-light px-0 py-3">${coin.latest_price}</td> :
                    prev_price[coin.name] === coin.latest_price ? <td className="text-sm text-white font-light px-0 py-3">${coin.latest_price}</td> :
                    <td className="text-sm text-green-600 font-light px-0 py-3">${coin.latest_price}</td>
                  }
                  {
                    coin.price_change_percentage >= 0 ?
                    <td className="text-sm text-green-600 font-light px-0 py-3">{coin.price_change_percentage}%</td> :
                    <td className="text-sm text-red-600 font-light px-0 py-3">{coin.price_change_percentage}%</td>
                  }
                  <td className="text-sm text-white font-light px-0 py-3">${coin.market_cap}</td>
                  <td className="text-sm text-white font-light px-0 py-3"></td>
                </tr> :
                null
              ))}
          </tbody>
        </table>
    </div>
  );
}

export default MarketWatch;