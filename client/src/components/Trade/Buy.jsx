import React, { useState } from 'react';

function Buy({orderType, setOrderType, coin, setCoin, setSymbol, portfolio, getNonCashAssets, coins, resetOrderForm, setOrderUnits, setCoinT}) {

  let [sellButton, setSellButton] = useState(<button className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Sell</button>
  );
  const nonCashAssets = getNonCashAssets();
  //if the user has no assets to sell, disable sell button
  if (nonCashAssets.length === 0) {
    sellButton = <button disabled className="basis-1/2 border-2 text-xl grayscale text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400">Sell</button>
  } else {
    //the user has assets to sell
    sellButton = <button onClick={() => {
      //if the currently selected coin is not an asset, reset currently selected coin to first coin user holds in its portfolio/assets
      if (nonCashAssets.indexOf(coin.name) === -1) {
        let coinToSet;
        for (var i = 0; i < coins.length; i++) {
          if (coins[i].name === nonCashAssets[0].coin) {
            coinToSet = coins[i];
            break;
          }
        }
        setSymbol(coinToSet.acronym);
        setCoinT(coinToSet);
      }
      setOrderType('sell');
      setOrderUnits('usd');
      resetOrderForm();
    }}
      className="basis-1/2 border-2 text-xl grayscale text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:grayscale-0">Sell</button>
  }

  return (
    <div className="flex w-full h-16">
      <button disabled={true} className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400">Buy</button>
      {sellButton}
    </div>
  )
}

export default Buy;
