import React, {useState} from 'react';
import Trade from '../Trade/Trade.jsx';
import MarketWatch from './MarketWatch.jsx';

const Market = ({ coins, activeTab, handleCoinClick, symbol}) => {

  return (
    <div>
      {activeTab === 'Market' ? <MarketWatch coins={coins} handleCoinClick={(e) => handleCoinClick(e)} /> : < Trade symbol={symbol}/>}
    </div>

    );
};

export default Market;