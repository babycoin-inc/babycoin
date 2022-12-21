import React, {useState} from 'react';
import axios from 'axios';

const Watchlist = ({ userWatchlist, coins, removeFromWatchlist }) => {

  return (
    <div className="overflow-x-auto relative">
      <table className="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          {coins.map((coinInfo, index) => (
            userWatchlist.includes(coinInfo.name) ?
              <tr key={index}>
                <td className="text-yellow-600" onClick={removeFromWatchlist} >★</td>
                <td>{coinInfo.name}</td>
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