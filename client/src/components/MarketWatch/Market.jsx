import React, {useState} from 'react';
import Trade from '../Trade/Trade.jsx';
import MarketWatch from './MarketWatch.jsx';

const Market = ({ coins, activePage, handleCoinClick, symbol}) => {

  return (
    <div>
      {activePage === 'Market Watch' ? <MarketWatch coins={coins} handleCoinClick={(e) => handleCoinClick(e)} /> : < Trade symbol={symbol}/>}
    </div>

    );
};

export default Market;