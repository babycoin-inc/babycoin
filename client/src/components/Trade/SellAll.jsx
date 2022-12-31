import React, { useState } from 'react';

function SellAll({coin, setOrderAmount, quantityOfCoin, orderUnits, roundToDecimalPlace, setSellAll, sellAll}) {

  return (
        <button disabled={sellAll} name="sellAll" className={`text-center rounded-xl py-2 px-10 mx-auto relative left-5 ${sellAll ? 'border border-4 border-green-400 bg-zinc-800 text-green-400 py-2 px-10 mx-auto' : 'bg-zinc-400 hover:bg-zinc-500'}`} onClick={() => {
          const amount = orderUnits === 'usd' ? roundToDecimalPlace(quantityOfCoin * coin.latest_price, 2) : roundToDecimalPlace(quantityOfCoin, 9);
          setOrderAmount(amount);
          setSellAll(true);
        }
        }>Sell All</button>
  )
}

export default SellAll;