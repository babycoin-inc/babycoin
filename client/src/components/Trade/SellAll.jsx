import React, { useState } from 'react';

function SellAll({coin, setOrderAmount, quantityOfCoin, orderUnits, roundNumUpToDigit, setSellAll, sellAll}) {

  return (
        <button disabled={sellAll} name="sellAll" className={`text-center rounded-xl py-2 px-10 mx-auto relative left-5 ${sellAll ? 'border border-4 border-green-400 bg-zinc-800 text-green-400 py-2 px-10 mx-auto' : 'bg-zinc-400 hover:bg-zinc-500'}`} onClick={() => {
          const amount = orderUnits === 'usd' ? roundNumUpToDigit(quantityOfCoin * coin.latest_price, 2) : roundNumUpToDigit(quantityOfCoin, 7);
          setOrderAmount(amount);
          setSellAll(true);
        }
        }>Sell All</button>
  )
}

export default SellAll;

{/* <div className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500 py-2 px-10 mx-auto relative left-5">
<button name="sellAll" className={`${sellAll ? 'border border-2 border-green-500 py-2 px-5 mx-auto' : undefined}`} onClick={() => {
  const amount = orderUnits === 'usd' ? roundNumUpToDigit(quantityOfCoin * coin.latest_price, 2) : roundNumUpToDigit(quantityOfCoin, 7);
  setOrderAmount(amount);
  setSellAll(true);
}
}>Sell All</button>
</div> */}