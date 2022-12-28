import React, {useState} from 'react';
import Trade from '../Trade/Trade.jsx';
import MarketWatch from './MarketWatch.jsx';

const Market = ({ coins, activePage, handleCoinClick, symbol, userWatchlist, toggleStars, prevPrice, authenticatedUser, sortConfig }) => {

  return (
    <div>
      {activePage === 'Market Watch' ?
      <MarketWatch sortConfig={sortConfig} coins={coins} handleCoinClick={handleCoinClick} userWatchlist={userWatchlist} toggleStars={toggleStars} authenticatedUser={authenticatedUser} /> :
      < Trade symbol={symbol}/>}
    </div>

    );
};

export default Market;