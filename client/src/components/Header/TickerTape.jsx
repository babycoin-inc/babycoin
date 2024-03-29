import React from 'react';
import Marquee from "react-fast-marquee";
import TickerEach from './TickerEach.jsx';

function MoveTicker({coins, handleCoinClick}) {

  return (
    <Marquee pauseOnHover="true" gradientWidth="0" speed="30">
      <div className="marquee" style={{flexWrap: 'wrap'}}>
      {coins === undefined ? [] : coins.map((coin, index) => (
        coin.acronym === "usd" ? null :
        <TickerEach key={index} coin={coin} handleCoinClick={(e) => handleCoinClick(e)}/>
      ))}
      </div>
    </Marquee>
  );
}

export default MoveTicker;
