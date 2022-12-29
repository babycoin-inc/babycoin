import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import OrderForm from './OrderForm.jsx';
import TradeableCoins from './TradeableCoins.jsx';
import Price from './Price.jsx';
import axios from 'axios';

function Order({ authenticatedUser, portfolio, coins, getPortfolioData, openAndPopulateModal, symbol, achievementsStatus, grantUserAchievement}) {
  const [orderType, setOrderType] = useState("buy");
  const [orderUnits, setOrderUnits] = useState('usd');
  const [orderAmount, setOrderAmount] = useState("");
  const [sellAll, setSellAll] = useState(false);
  const [coin, setCoin] = useState(() => {
    symbol = symbol.toUpperCase();
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
  let marketValueOfCoin;

  const getPortfolioQuantityOfCoin = () => {
    const index = portfolio.findIndex((asset, index) => { return asset.acronym === coin.acronym });
    quantityOfCoin = portfolio[index].quantity;
    return quantityOfCoin;
  };

  const getMarketValueInUSDOfCoin = () => {
    marketValueOfCoin = quantityOfCoin * coin.latest_price;
    return marketValueOfCoin;
  }

  const getCash = () => {
    const cashIndex = portfolio.findIndex((asset) => {
      return asset.acronym === 'usd'
    });
    return portfolio[cashIndex];
  };

  const roundNumUpToDigit = (num, digits) => {
    const numAsString = num.toString();
    const indexOfDec = numAsString.indexOf('.');
    if (indexOfDec === -1) {
      return num;
    }
    let right = numAsString.slice(indexOfDec + 1, indexOfDec + 1 + digits);
    let left = numAsString.slice(-numAsString.length, indexOfDec + 1);
    return Number(left + right);
  }

  const resetOrderForm = () => {
    setSellAll(false);
    setOrderAmount("");
  }

  const sellAllOfCoin = () => {
    //set total_trade_coin to max amount of quantityOfCoin
    total_trade_coin = getPortfolioQuantityOfCoin();
    total_trade_fiat = getMarketValueInUSDOfCoin();
    //set total_trade_fiat to max amount of coin
    console.log('total_trade_coin when sellAll: ', total_trade_coin);
    console.log('total_trade_fiat when sellAll: ', total_trade_fiat);
  }

  const calculateSetTotals = () => {
    const value = parseFloat(orderAmount);
    if (orderUnits === 'usd') {
      total_trade_fiat = value;
      total_trade_coin = value / coin.latest_price;
      //round total_trade_coin to the fifth decimal point based on total_trade_fiat / price
      // total_trade_coin = roundNumUpToDigit(value / coin.latest_price, 5);
      // total_trade_fiat = roundNumUpToDigit(total_trade_coin * coin.latest_price, 2);
      console.log('total_trade_coin when orderUnits is usd: ', total_trade_coin);
    } else if (orderUnits === 'coin') {
      total_trade_fiat = value * coin.latest_price;
      total_trade_coin = value;
      //round total_trade_fiat to the nearest cent based on total_trade_coin x price
      // total_trade_fiat = roundNumUpToDigit(total_trade_coin * coin.latest_price, 2);
      console.log('total_trade_coin when orderUnits is coin: ', total_trade_coin);
    }
  };

  if (coin !== undefined) {
    if (sellAll) {
      sellAllOfCoin();
    } else {
      calculateSetTotals();
    }
  }

  console.log('orderAmount: ', orderAmount);
  // console.log('total_trade_coin: ', total_trade_coin);
  // console.log('total_trade_fiat: ', total_trade_fiat);

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

  //VALIDATION
  if (orderAmount.length === 0) {
    isOrderValid = false;
  }

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
      const transaction = {
        coin_id: coin.id,
        currency: 'usd',
        purchase_price: Number(coin.latest_price),
        'total_trade_coin': total_trade_coin,
        'total_trade_fiat': total_trade_fiat,
        trader_id: authenticatedUser,
        coinName: coin.name
      }
      //if sellAll is true
        //send to a new endpoint where we handle the divisible by 0 error and remove the asset from portfolio
      //otherwise...do the same as below
      const orderResult = await axios.post(`/users/${authenticatedUser}/transactions/${orderType}`, transaction);
      await getPortfolioData(authenticatedUser);
      openAndPopulateModal(
        {
          'coin': coin,
          'total_trade_coin': total_trade_coin,
          'total_trade_fiat': total_trade_fiat,
          'purchase_price': Number(coin.latest_price),
          'orderType': orderType
        }
      );
      resetOrderForm();
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
    <div className="flex flex-col items-center space-y-8 bg-zinc-700 rounded-xl w-1/3 h-3/4">
      {orderType === 'buy' ? <Buy orderType={orderType} setOrderType={setOrderType} getNonCashAssets={getNonCashAssets} setCoin={setCoin} coin={coin} coins={coins} resetOrderForm={resetOrderForm} setOrderUnits={setOrderUnits}/> : <Sell Buy orderType={orderType} setOrderType={setOrderType} resetOrderForm={resetOrderForm} setOrderUnits={setOrderUnits} />}
      <OrderForm coin={coin} orderUnits={orderUnits} setOrderUnits={setOrderUnits} orderType={orderType} total_trade_fiat={total_trade_fiat} total_trade_coin={total_trade_coin} getCash={getCash} orderAmount={orderAmount} setOrderAmount={setOrderAmount} isOrderValid={isOrderValid} quantityOfCoin={quantityOfCoin} roundNumUpToDigit={roundNumUpToDigit} setSellAll={setSellAll}/>
      <TradeableCoins tradeableCoins={orderType === 'buy' ? getNonCashCoins() : getNonCashAssets()} resetOrderForm={resetOrderForm} orderType={orderType} coin={coin} setCoin={setCoin} coins={coins} />
      <Price coin={coin} />
      <div>
        <button disabled={!isOrderValid} name="submit" className={`text-lg mb-6 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto active:border active:border-orange-400 h-14 w-44 ${isOrderValid ? "hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 bg-orange-400 text-orange-900" : "bg-zinc-800 text-orange-500"}`} onClick={submitOrder}>Submit Order</button>
      </div>
    </div>
  )
}

export default Order;