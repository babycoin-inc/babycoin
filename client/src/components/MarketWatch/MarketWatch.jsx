import React, {useState, useEffect} from 'react';

const MarketWatch = ({coins, handleCoinClick, userWatchlist, toggleStars, authenticatedUser }) => {

  const prev_price = {};

  coins.map(coin => {
    prev_price[coin.name] = JSON.parse(window.localStorage.getItem(`previous price of ${coin.name} for the ${authenticatedUser}:`));
    useEffect(() => {
      window.localStorage.setItem(`previous price of ${coin.name} for the ${authenticatedUser}:`, JSON.stringify(coin.latest_price));
    }, [coin.latest_price]);
  });


  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const sorting = (e) => {
    console.log(e.target);
  }

  return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center table-auto">
          <thead className="border-b bg-zinc-700 py-5">
            <tr>
              <th className="text-lg text-right font-medium text-white py-1 w-1/12">
              </th>
              <th className="text-justify text-lg font-medium text-white py-1 w-1/6">
                Coin
              </th>
              <th className="text-lg font-medium text-white py-1 w-1/6" onClick = {(e) => sorting(e)}>
                Price
              </th>
              <th className="text-lg font-medium text-white py-1 w-1/6">
                24h
              </th>
              <th className="text-lg font-medium text-white py-1 w-1/6">
                Mkt Cap
              </th>
              <th className="text-justify text-lg font-medium text-white py-1 w-1/5">
                Last 7 days
              </th>
            </tr>
          </thead>
          <tbody>
              {coins.map((coin, index) => (
                coin.acronym !== 'usd' ?
                <tr key={index} className="border border-gray-800 bg-zinc-900 hover:bg-zinc-800">
                  {userWatchlist.includes(coin.name) ? <td className="text-lg text-yellow-600 font-light text-right mr-2" onClick={toggleStars}>★</td> : <td className="text-lg text-white font-light text-right mr-2" onClick={toggleStars}>☆</td>}
                  <td className="text-white font-light">
                    <div className="flex items-center">
                        <img className="w-7 ml-1 mr-1" src={coin.image}/>
                        <div href="#hover" className="no-underline hover:underline cursor-pointer" onClick={handleCoinClick}>
                          <span className="mr-1 font-semibold text-sm">{coin.name}</span>
                          <span className="text-xs">{coin.acronym.toUpperCase()}</span>
                        </div>
                    </div>
                  </td>
                  { prev_price[coin.name] > coin.latest_price ? <td className="text-sm text-red-600 font-light py-1">${coin.latest_price}</td> :
                    prev_price[coin.name] === coin.latest_price ? <td className="text-sm text-white font-light py-1">${coin.latest_price}</td> :
                    <td className="text-sm text-green-600 font-light py-1">${coin.latest_price}</td>
                  }
                  {
                    coin.price_change_percentage >= 0 ?
                    <td className="text-sm text-green-600 font-light py-1">{coin.price_change_percentage}%</td> :
                    <td className="text-sm text-red-600 font-light py-1">{coin.price_change_percentage}%</td>
                  }
                  <td className="text-sm text-white font-light mr-1 py-1">${coin.market_cap}</td>
                  <td className="py-1 flex"><img className="inline-flex w-7/12" src={'https://www.coingecko.com/coins/' + coin.image.split('/')[5] + '/sparkline'}/></td>
                </tr> :
                null
              ))}
          </tbody>
        </table>
    </div>
  );
}

export default MarketWatch;