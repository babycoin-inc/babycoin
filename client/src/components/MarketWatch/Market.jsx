import React, {useState} from 'react';
import Trade from '../Trade/Trade.jsx';
import MarketWatch from './MarketWatch.jsx';

const Market = ({ coins, activePage, handleCoinClick, symbol, userWatchlist, toggleStars}) => {

  return (
    <div>
      {activePage === 'Market Watch' ?
      <MarketWatch coins={coins} handleCoinClick={handleCoinClick} userWatchlist={userWatchlist} toggleStars={toggleStars}/> :
      < Trade symbol={symbol}/>}
    </div>

    );
};

export default Market;