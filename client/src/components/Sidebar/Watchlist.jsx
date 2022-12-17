import React, {useState} from 'react';
import validStar from './valid.png';
import invalidStar from './invalid.png';

const Watchlist = ({ userWatchlist, coins }) => {

  const [valid, setValid] = useState(true);

  return (
    <div className="overflow-x-auto relative">
      <table className="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          {coins.map(coinInfo => (
            userWatchlist.includes(coinInfo.name) ?
              <tr>
                <td>{coinInfo.name}</td>
                <td>{coinInfo.latest_price}</td>
                <td className={valid ? "valid-star" : "invalid-star"}>
                  <img
                    className="w-1/20 h-1/20"
                    onClick={() => setValid(prevMode => !prevMode)}
                    src={valid ? validStar : invalidStar}
                  />
                </td>
              </tr>
            : null
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;