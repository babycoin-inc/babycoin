import React, { useState } from 'react';

function SellAll({coin, portfolio, orderUnits}) {

  return (
    <div className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500 py-2 px-10 mx-auto relative left-5">
        {/* <button onClick={() => {
          const amount = orderUnits === 'usd' ? roundNumUpToDigit(getAssetFromPortfolio(coin.acronym).quantity * coin.latest_price, 2) : roundNumUpToDigit((getAssetFromPortfolio(coin.acronym)).quantity, 5);
          setOrderAmount(amount);
        }
        }>Sell All</button> */}
      </div>
  )
}

export default SellAll;