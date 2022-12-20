import React, { useState } from 'react';

// import Balance from './Balance.jsx';

function Buy({coin, portfolio, coins, authenticatedUser, orderType}) {
  const [sellButton, setSellButton] = useState(      <button className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Sell</button>
  );

  // if (getCoinsInPortfolio().length === 0) {
  //   sellButton = <button disabled onClick={() => setOrderType('sell')} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400">Sell</button>
  // } else {
  //   sellButton = <button onClick={() => {
  //     //if current selected coin is not in the user's portfolio, reset coin to first coin in portfolio
  //     const coinsInPortfolio = getCoinsInPortfolio();
  //     if (coinsInPortfolio.indexOf(coin.name) === -1) {
  //       var coinToSet;
  //       for (var i = 0; i < coins.length; i++) {
  //         if (coins[i].name === coinsInPortfolio[0]) {
  //           coinToSet = coins[i];
  //           break;
  //         }
  //       }
  //       setCoin(coinToSet);
  //     }
  //     setOrderType('sell')}
  //   }
  //     className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Sell</button>
  // }

  return (
    <div className="flex w-full h-16">
      <button disabled={true} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto">Buy</button>
      {sellButton}
    </div>
  )
}

export default Buy;