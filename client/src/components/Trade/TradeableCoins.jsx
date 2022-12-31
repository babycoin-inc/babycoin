import React, { useState } from 'react';

function TradeableCoins({coins, orderType, coin, tradeableCoins, setCoin, setSymbol, resetOrderForm}) {

  const capitalizeFirstLetter = (str) => {
    let word = str[0].toUpperCase();
    word += str.slice(1);
    return word;
  }

  const coinsToDisplay =  tradeableCoins.map((coin, index) => {
    if (coin.name !== undefined) {
      return <option value={coin.name} key={index}>{coin.name}</option>
    } else if (coin.coin !== undefined) {
      return <option value={coin.coin} key={index}>{coin.coin}</option>
    }
  })

  return (
    <div className="flex justify-between gap-4 h-10">
      <div className="self-center">{capitalizeFirstLetter(orderType)}</div>
      <select className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" value={coin.name} onChange={(event) => {
        const coinIndex = coins.findIndex(coin => coin.name === event.target.value);
        setSymbol(coins[coinIndex].acronym);
        resetOrderForm();
      }}>
        {coinsToDisplay}
      </select>
    </div>
  )
}

export default TradeableCoins;