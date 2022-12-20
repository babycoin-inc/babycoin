import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import SellAll from './SellAll.jsx';
import OrderForm from './OrderForm.jsx';
import TradeableCoins from './TradeableCoins.jsx';
import Price from './Price.jsx';

function Order({ authenticatedUser, portfolio, coins, getPortfolioData, openModal, closeModal, populateModalValues, selectedCoin}) {
  const [orderType, setOrderType] = useState("buy");
  const [orderUnits, setOrderUnits] = useState('usd');
  //DEFAULT COIN: CHANGE TO SELECTED COIN
  let [coin, setCoin] = useState(() => {
    if (selectedCoin !== undefined) {
      return selectedCoin;
    } else {
      return coins[1];
    }});

  // let [total_trade_coin, setTotalTradeCoin] = useState();
  // let [total_trade_fiat, setTotalTradeFiat] = useState();

  // buy props: coin={coin} portfolio={portflio} coins={coins} authenticatedUser={authenticatedUser} orderType={orderType}

  //ADD THE BELOW ONCLICK TO LAST DIV
  // onClick={submitOrder}

  // const submitOrder = async () => {

  //   try {
  //     const orderResult = await axios.post(`/users/${authenticatedUser}/transactions/${orderType}`, {
  //       coin_id: coin.id,
  //       currency: 'usd',
  //       purchase_price: Number(coin.latest_price),
  //       'total_trade_coin': total_trade_coin,
  //       'total_trade_fiat': total_trade_fiat,
  //       trader_id: authenticatedUser,
  //       coinName: coin.name
  //     })
  //     getPortfolioData(authenticatedUser);
  //     setOrderAmount("");
  //     populateModalValues(
  //       {
  //         'coin': coin,
  //         'total_trade_coin': roundNumUpToDigit(total_trade_coin, 8),
  //         'total_trade_fiat': total_trade_fiat,
  //         'purchase_price': Number(coin.latest_price),
  //         'orderType': orderType
  //       }
  //     );
  //     openModal();
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <div className="flex flex-col items-center space-y-8 w-1/3 bg-zinc-700 rounded-xl">
      {orderType === 'buy' ? <Buy /> : <Sell />}
      <OrderForm coin={coin} />
      {orderType === 'sell' ? <SellAll /> : undefined}
      <TradeableCoins coins={orderType === 'buy' ? coins : coins} orderType={orderType} coin={coin} />
      <Price coin={coin} />
      <div>
        <button name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Submit Order</button>
      </div>
    </div>
  )
}

export default Order;