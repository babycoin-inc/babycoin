import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import SellAll from './SellAll.jsx';
import OrderForm from './OrderForm.jsx';

function Order({ authenticatedUser, portfolio, coins, getPortfolioData, openModal, closeModal, populateModalValues, selectedCoin}) {
  const [orderType, setOrderType] = useState("buy");
  const [orderUnits, setOrderUnits] = useState('usd');
  //DEFAULT COIN: CHANGE TO SELECTED COIN
  let [coin, setCoin] = useState(selectedCoin || coins[1]);
  // let [total_trade_coin, setTotalTradeCoin] = useState();
  // let [total_trade_fiat, setTotalTradeFiat] = useState();

  // buy props: coin={coin} portfolio={portflio} coins={coins} authenticatedUser={authenticatedUser} orderType={orderType}

  return (
    <div className="flex flex-col items-center space-y-8 w-1/3 bg-zinc-700 rounded-xl">
      {orderType === 'buy' ? <Buy /> : <Sell />}
      <OrderForm coin={coin}/>
      {orderType === 'sell' ? <SellAll /> : undefined}
    </div>
  )
}

export default Order;