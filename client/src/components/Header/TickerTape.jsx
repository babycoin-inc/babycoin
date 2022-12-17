import React from 'react';
import Marquee from "react-fast-marquee";
import TickerEach from './TickerEach.jsx';

function MoveTicker({coins, handleCoinClick}) {

  return (
    <>
    <Marquee pauseOnHover="true" gradientWidth="0" speed="30">
      {coins.map((coin, index) => (
        coin.acronym === "usd" ? null :
        <TickerEach coin={coin} handleCoinClick={(e) => handleCoinClick(e)}/>
      ))}
    </Marquee>
    </>
  );
}

export default MoveTicker;
