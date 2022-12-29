import React from 'react';
import placeholder from './watchlist_placeholder.png';

const Watchlist = ({ userWatchlist, coins, removeFromWatchlist, authenticatedUser, handleCoinClick, goToMarketwatch }) => {

  const prev_price = {};

  coins.map(coin => {
    prev_price[coin.name] = JSON.parse(window.localStorage.getItem(`previous price of ${coin.name} for the ${authenticatedUser}:`));
  });

  return (
    userWatchlist.length > 0 ?
    <div className="relative text-center">
      {/* <table className="flex items-center text-center border border-white ml-3 mr-3 table-auto"> */}
      <table className="w-11/12 text-center table-auto ml-3 border">
        <thead className="border-b bg-zinc-800">
            <tr>
              <th className="text-xs text-white px-0 py-1">
              </th>
              <th className="text-xs text-white px-1 py-1 flex">
                Coin
              </th>
              <th className="text-xs text-white px-3 py-1" >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coinInfo, index) => (
              userWatchlist.length > 0 && userWatchlist.includes(coinInfo.name) ?
                <tr key={index} className="bg-zinc-900 hover:bg-zinc-700">
                  <td className="text-yellow-600" onClick={removeFromWatchlist} >★</td>
                  <td className="text-xs text-white font-light px-1 py-1 flex items-center">
                    <span className="inline-flex"><img className="w-5 object-center mr-2" src={coinInfo.image}/></span>
                    <span href="#hover" className="no-underline hover:underline cursor-pointer" onClick={handleCoinClick}>
                      {coinInfo.name}
                    </span>
                  </td>
                  { prev_price[coinInfo.name] > coinInfo.latest_price ? <td className="text-xs text-red-600 font-light px-0 py-1">${coinInfo.latest_price}</td> :
                    prev_price[coinInfo.name] === coinInfo.latest_price ? <td className="text-xs text-white font-light px-0 py-1">${coinInfo.latest_price}</td> :
                    <td className="text-xs text-green-600 font-light px-0 py-1">${coinInfo.latest_price}</td>
                  }
                </tr>
              : null
            ))}
          </tbody>
        </table>
    </div>
    : <div>
        <img className="mx-auto px-20" src={placeholder} />
        <p className="text-center text-xs py-1 px-6">You are not watching any coins yet.</p>
        <p className="text-center text-green-600 text-xs no-underline hover:underline cursor-pointer px-6" onClick={goToMarketwatch} >Add new coins to get started!</p>
      </div>
  );
};

export default Watchlist;