import React, { useState } from 'react';

function SellAll({coin, setOrderAmount, quantityOfCoin, orderUnits, roundNumUpToDigit, setSellAll}) {

  return (
    <div className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500 py-2 px-10 mx-auto relative left-5">
        <button onClick={() => {
          const amount = orderUnits === 'usd' ? roundNumUpToDigit(quantityOfCoin * coin.latest_price, 2) : roundNumUpToDigit(quantityOfCoin, 5);
          setOrderAmount(amount);
          setSellAll(true);
        }
        }>Sell All</button>
      </div>
  )
}

export default SellAll;