import React, {useState} from 'react';
import validStar from './valid.png';
import axios from 'axios';

const Watchlist = ({ userWatchlist, coins, removeFromWatchlist }) => {

  return (
    <div className="overflow-x-auto relative">
      <table className="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          {coins.map(coinInfo => (
            userWatchlist.includes(coinInfo.name) ?
              <tr>
                <img className="w-8" src={validStar} onClick={removeFromWatchlist}/> 
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