import React from 'react';

const Watchlist = ({ userWatchlist, coins }) => {
  console.log('userWatchlist', userWatchlist, 'coins', coins);
  return (
    <div className="overflow-x-auto relative">
      <table className="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          {coins.map(coinInfo => (
            userWatchlist.includes(coinInfo.name) ?
              <tr>
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