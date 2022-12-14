import React, {useState} from 'react';
import Trade from '../Trade/Trade.jsx';
import MarketWatch from './MarketWatch.jsx';

const Market = ({ coins }) => {

  const [activePage, setActivePage] = useState('Market');

  function handleCoinClick (e) {
    e.preventDefault();
    setActivePage('Trade');
  }

  const activeComponent = activePage === 'Market' ? <MarketWatch coins={coins} handleCoinClick={handleCoinClick}/> : <Trade />

  return (
    <div>
        {activeComponent}
    </div>

    );
};

export default Market;