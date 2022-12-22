import React, {useState} from 'react';
import Trade from '../Trade/Trade.jsx';
import MarketWatch from './MarketWatch.jsx';

const Market = ({ coins, activePage, handleCoinClick, symbol, userWatchlist, addToWatchlist}) => {

  return (
    <div>
      {activePage === 'Market Watch' ?
      <MarketWatch coins={coins} handleCoinClick={(e) => handleCoinClick(e)} userWatchlist={userWatchlist} addToWatchlist={addToWatchlist} /> :
      < Trade symbol={symbol}/>}
    </div>

    );
};

export default Market;