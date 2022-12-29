import React, {useEffect} from 'react';

const MarketWatch = ({coins, handleCoinClick, userWatchlist, toggleStars, authenticatedUser, sortConfig }) => {

  const prev_price = {};

  coins.map(coin => {
    console.log(Number(coin.image.split('/')[5]));
    prev_price[coin.name] = JSON.parse(window.localStorage.getItem(`previous price of ${coin.name} for the ${authenticatedUser}:`));
    useEffect(() => {
      window.localStorage.setItem(`previous price of ${coin.name} for the ${authenticatedUser}:`, JSON.stringify(coin.latest_price));
    }, [coin.latest_price]);
  });

  // let sortedCoins = coins.slice();

  // if (sortConfig !== null) {
  //   sortedCoins.sort((a, b) => {
  //     if (a[sortConfig.sortColumn] < b[sortConfig.sortColumn]) {
  //       return sortConfig.direction === 'ascending' ? -1 : 1;
  //     } else if (a[sortConfig.sortColumn] > b[sortConfig.sortColumn]) {
  //       return sortConfig.direction === 'ascending' ? 1 : -1;
  //     }
  //     return 0;
  //   })
  // }

  // const requestSort = sortColumn => {
  //   let direction = 'ascending';
  //   if (sortConfig && sortConfig.sortColumn === sortColumn && sortConfig.direction === 'ascending') {
  //     direction = 'descending';
  //   }
  //   setSortConfig({sortColumn, direction});
  //   return {coins: sortedCoins, requestSort, sortConfig};
  // }

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
              <th className="text-lg font-medium text-white py-1 w-1/6" >
                Price
              </th>
              <th className="text-lg font-medium text-white py-1 w-1/6">
                24h
              </th>
              <th className="text-lg font-medium text-white py-1 w-1/5">
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
                  <td className="text-sm text-white font-light py-1 flex">
                        <span className="inline-flex "><img className="w-7 mr-1" src={coin.image}/></span>
                        <div href="#hover" className="no-underline hover:underline cursor-pointer" onClick={handleCoinClick}>
                          <span className="mr-1 font-semibold">{coin.name}</span>
                          <span>{coin.acronym.toUpperCase()}</span>
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
                  <td className="py-1 flex"><img className="inline-flex w-3/5" src={'https://www.coingecko.com/coins/' + coin.image.split('/')[5] + '/sparkline'}/></td>
                </tr> :
                null
              ))}
          </tbody>
        </table>
    </div>
  );
}

export default MarketWatch;