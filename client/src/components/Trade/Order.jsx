import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import OrderForm from './OrderForm.jsx';
import TradeableCoins from './TradeableCoins.jsx';
import Price from './Price.jsx';
import axios from 'axios';

function Order({ authenticatedUser, portfolio, coins, getPortfolioData, openModal, closeModal, populateModalValues, symbol, achievementsStatus, grantUserAchievement}) {
  const [orderType, setOrderType] = useState("buy");
  const [orderUnits, setOrderUnits] = useState('usd');
  const [orderAmount, setOrderAmount] = useState("");
  const [coin, setCoin] = useState(() => {
    if (symbol !== undefined) {
      //map symbol to its respective acronym in coins
      const coinIndex = coins.findIndex((coin) => {
        return coin.acronym.toUpperCase() === symbol;
      });
      return coins[coinIndex];
      //return the full coin object
    } else {
      return coins[1];
    }
  });
  let total_trade_coin;
  var total_trade_fiat;
  let isOrderValid = true;
  let quantityOfCoin;

  const getPortfolioQuantityOfCoin = () => {
    const index = portfolio.findIndex((asset, index) => { return asset.acronym === coin.acronym });
    quantityOfCoin = portfolio[index].quantity;
  };

  const getCash = () => {
    const cashIndex = portfolio.findIndex((asset) => {
      return asset.acronym === 'usd'
    });
    return portfolio[cashIndex];
  };

  const calculateSetTotals = (() => {
    const value = parseFloat(orderAmount);
    if (orderUnits === 'usd') {
      total_trade_fiat = value;
      total_trade_coin = value / coin.latest_price;
    } else if (orderUnits === 'coin') {
      //round down value at the fifth digit place
      total_trade_fiat = value * coin.latest_price;
      total_trade_coin = value;
    }
  })();

  const getNonCashAssets = () => {
    const nonCashAssets = [];
    portfolio.forEach((asset) => {
      if (asset.acronym !== 'usd') {
        nonCashAssets.push(asset);
      }
    });
    return nonCashAssets;
  }

  const getNonCashCoins = () => {
    const nonCashCoins= [];
    coins.forEach((coin) => {
      if (coin.acronym !== 'usd') {
        nonCashCoins.push(coin);
      }
    });
    return nonCashCoins;
  }

  const cash = getCash().quantity;
  const maxCoinOrderAmount = cash / coin.latest_price;

  //BUY VALIDATION
  if (orderType === 'buy' && orderUnits === 'usd'){
    // if usd orderAmount exceeds available cash
    if (total_trade_fiat > cash) {
      isOrderValid = false;
    }
  } else if (orderType === 'buy' && orderUnits === 'coin'){
    // if coin orderAmount exceeds available cash
    if (total_trade_coin > maxCoinOrderAmount) {
      isOrderValid = false;
    }
  }

  //SELL VALIDATION
  if (orderType === 'sell') {
    getPortfolioQuantityOfCoin();
    if (orderUnits === 'usd') {
      if (total_trade_fiat > quantityOfCoin * coin.latest_price) {
        // console.log('total_trade_fiat > quantityOfCoin * coin.latest_price', total_trade_fiat, ' > ', quantityOfCoin * coin.latest_price);
        isOrderValid = false
      }
    } else if (orderUnits === 'coin') {
      if (total_trade_coin > quantityOfCoin) {
        // console.log('total_trade_coin > quantityOfCoin', total_trade_coin, ' > ',quantityOfCoin);
        isOrderValid = false;
      }
    }
  }

  const submitOrder = async () => {
    try {
      const orderResult = await axios.post(`/users/${authenticatedUser}/transactions/${orderType}`, {
        coin_id: coin.id,
        currency: 'usd',
        purchase_price: Number(coin.latest_price),
        'total_trade_coin': total_trade_coin,
        'total_trade_fiat': total_trade_fiat,
        trader_id: authenticatedUser,
        coinName: coin.name
      })
      await getPortfolioData(authenticatedUser);
      setOrderAmount("");
      // populateModalValues(
      //   {
      //     'coin': coin,
      //     'total_trade_coin': roundNumUpToDigit(total_trade_coin, 8),
      //     'total_trade_fiat': total_trade_fiat,
      //     'purchase_price': Number(coin.latest_price),
      //     'orderType': orderType
      //   }
      // );
      // openModal();
      if (!achievementsStatus[2] && orderType === 'buy') {
        grantUserAchievement(2);
      }
      if (!achievementsStatus[5] && orderType === 'sell') {
        grantUserAchievement(5);
      }
      if (!achievementsStatus[4] && orderType === 'buy' && total_trade_fiat <= 5) {
        grantUserAchievement(4);
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-1/3 bg-zinc-700 rounded-xl">
      {orderType === 'buy' ? <Buy orderType={orderType} setOrderType={setOrderType} getNonCashAssets={getNonCashAssets} setCoin={setCoin} coin={coin} coins={coins} setOrderAmount={setOrderAmount} setOrderUnits={setOrderUnits}/> : <Sell Buy orderType={orderType} setOrderType={setOrderType} setOrderAmount={setOrderAmount} setOrderUnits={setOrderUnits} />}
      <OrderForm coin={coin} orderUnits={orderUnits} setOrderUnits={setOrderUnits} orderType={orderType} total_trade_fiat={total_trade_fiat} total_trade_coin={total_trade_coin} getCash={getCash} orderAmount={orderAmount} setOrderAmount={setOrderAmount} isOrderValid={isOrderValid} quantityOfCoin={quantityOfCoin}/>
      <TradeableCoins tradeableCoins={orderType === 'buy' ? getNonCashCoins() : getNonCashAssets()} setOrderAmount={setOrderAmount} orderType={orderType} coin={coin} setCoin={setCoin} coins={coins} />
      <Price coin={coin} />
      <div>
        <button disabled={!isOrderValid} name="submit" className={`text-lg mb-6 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto active:border active:border-orange-400 h-14 w-44 ${isOrderValid ? "hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 bg-orange-400 text-orange-900" : "bg-zinc-800 text-orange-500"}`} onClick={submitOrder}>Submit Order</button>
      </div>
    </div>
  )
}

export default Order;