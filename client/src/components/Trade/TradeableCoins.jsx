import React, { useState } from 'react';

function TradeableCoins({orderType, coin, coins}) {

  const capitalizeFirstLetter = (str) => {
    let word = str[0].toUpperCase();
    word += str.slice(1);
    return word;
  }

  // onChange={(event) => {
  //   const coinIndex = coins.findIndex(coin => coin.name === event.target.value);
  //   setCoin(coins[coinIndex]);
  //   handleOrderAmountChange("");
  // }}

  return (
    <div className="flex justify-between gap-4 h-10">
    <div className="self-center">{capitalizeFirstLetter(orderType)}</div>
    <select className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" value={coin.name} >
     {/* {coinOrderList} */}
    </select>
  </div>
  )
}

export default TradeableCoins;