import React, {useEffect} from 'react';

const Watchlist = ({ userWatchlist, coins, removeFromWatchlist, authenticatedUser }) => {

  return (
    <div className="overflow-x-auto relative">
      <table className="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          {coins.map((coinInfo, index) => (
            userWatchlist.includes(coinInfo.name) ?
              <tr key={index}>
                <td className="text-yellow-600" onClick={removeFromWatchlist} >★</td>
                <td className="text-sm text-white font-light px-1 py-1 flex items-center">
                  <span className="inline-flex"><img className="w-5 object-center mr-2" src={coinInfo.image}/></span>
                  {coinInfo.name}
                </td>
                <td>{coinInfo.latest_price}</td>
              </tr>
            : null
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;