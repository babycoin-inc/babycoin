import React, { useState } from 'react';

function Sell({orderType, setOrderType, resetOrderForm, setOrderUnits}) {

  const buyButton = <button onClick={() => {
    setOrderType('buy');
    setOrderUnits('usd');
    resetOrderForm();
  }} className="basis-1/2 border-2 text-xl grayscale text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:grayscale-0">Buy</button>

  const sellButton = <button disabled={true} className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400">Sell</button>

  return (
    <div className="flex w-full h-16">
      {buyButton}
      {sellButton}
    </div>
  )
}

export default Sell;