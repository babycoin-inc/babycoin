import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { IconContext } from "react-icons";
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

function Order({ authenticatedUser, portfolio, coins }) {
  const [orderType, setOrderType] = useState("buy");
  let [orderAmount, setOrderAmount] = useState("");
  let [orderUnits, setOrderUnits] = useState('usd');
  //DEFAULT COIN: CHANGE TO SELECTED COIN
  let [coin, setCoin] = useState(coins[2]);
  let [total_trade_coin, setTotalTradeCoin] = useState();
  let [total_trade_fiat, setTotalTradeFiat] = useState();

  console.log('coins: ', coins);
  console.log('portfolio: ', portfolio);
  console.log('total_trade_coin: ', total_trade_coin);
  console.log('total_trade_fiat: ', total_trade_fiat);
  console.log('orderAmount: ', orderAmount);

  let buyButton;
  let sellButton;
  let orderInput;
  let sellAll;
  let convertButton;
  let maxOrderAmountMessage;
  let coinOrderList;
  const getCoinsInPortfolio = () => {
    let result = [];
    portfolio.forEach((asset) => {
      console.log('porftolio to start: ', portfolio);
      if (asset.acronym !== 'usd') {
        result.push(asset.coin);
      }
    });
    return result;
  }

  if (orderType === 'buy') {
    coinOrderList =  coins.slice(1).map((crypto, index) => {
      return <option value={crypto.name} key={index}>{crypto.name}</option>
    })

    buyButton = <button disabled={true} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto">Buy</button>

    if (portfolio.length <= 1) {
      sellButton = <button disabled onClick={() => setOrderType('sell')} className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Sell</button>
    } else {
      sellButton = <button onClick={() => {
        //if current selected coin is not in the user's portfolio, reset coin to first coin in portfolio
        const coinsInPortfolio = getCoinsInPortfolio();
        console.log('coinsInPortfolio: ', coinsInPortfolio);
        console.log('coins.name: ',coin.name);
        if (coinsInPortfolio.indexOf(coin.name) === -1) {
          var coinToSet;
          for (var i = 0; i < coins.length; i++) {
            if (coins[i].name === coinsInPortfolio[0]) {
              console.log('MADE IT');
              console.log('coins[i].name: ',coins[i].name);
              console.log('coinsInPortfolio: ', coinsInPortfolio);
              coinToSet = coins[i];
              break;
            }
          }
          console.log('coinToSet: ', coinToSet);
          setCoin(coinToSet);
        }
        setOrderType('sell')}
      }
        className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Sell</button>
    }
  } else if (orderType === 'sell') {
    buyButton = <button onClick={() => setOrderType('buy')} className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Buy</button>
    sellButton = <button disabled={true} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto">Sell</button>

    sellAll =
      <div className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500 py-2 px-10 mx-auto relative left-5">
        <button onClick={() => setOrderAmount(orderUnits === 'usd' ? total_trade_fiat : total_trade_coin)}>Sell All</button>
      </div>

    coinOrderList = portfolio.map((asset, index) => {
      //only return coins we have assets for in portfolio, and excluding usd
      if (asset.acronym !== 'usd') {
        return <option value={asset.coin} key={index}>{asset.coin}</option>
      }
    })
  }

  if (orderUnits === 'usd') {
    orderInput = <NumericFormat className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" displayType="input" type="text" value={orderAmount} allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" prefix='$' decimalScale={2} allowLeadingZeros={false} thousandSeparator="," onValueChange={(values, sourceInfor) => { handleOrderAmountChange(values.value) }} />

    console.log('undefined coin.acronym: ', coin, coin.acronym);
    convertButton = <div className="self-start text-sm text-center">{coin.acronym.toUpperCase()}</div>

  } else if (orderUnits === 'coin') {
    orderInput = <NumericFormat className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" displayType="input" type="text" value={orderAmount} allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" decimalScale={5} onValueChange={(values, sourceInfor) => { handleOrderAmountChange(values.value) }} />

    convertButton = <div className="self-start text-m text-center">$</div>
  }

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

  const getAssetFromPortfolio = (acronym) => {
    const index = portfolio.findIndex((asset, index) => {return asset.acronym === acronym});
    return portfolio[index];
  }

  if (orderUnits === 'coin' && orderType === 'buy') {
    let maxCoinOrderAmount = getAssetFromPortfolio('usd').quantity / coin.latest_price;
    maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to {roundNumUpToDigit(maxCoinOrderAmount, 5)} {coin.acronym.toUpperCase()}</div>
  } else if(orderUnits === 'usd' && orderType === 'buy') {
    maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to ${getAssetFromPortfolio('usd').quantity}</div>
  } else if(orderUnits === 'coin' && orderType === 'sell') {
    maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to {roundNumUpToDigit((getAssetFromPortfolio(coin.acronym)).quantity, 5)} {coin.acronym.toUpperCase()}</div>
  } else if(orderUnits === 'usd' && orderType === 'sell') {
    console.log('coin selling: ', coin);
    console.log('getAssetFromPortfolio(coin.acronym): ', getAssetFromPortfolio(coin.acronym));
    console.log('getAssetFromPortfolio(coin.acronym).quantity: ', getAssetFromPortfolio(coin.acronym).quantity);
    maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to ${roundNumUpToDigit(getAssetFromPortfolio(coin.acronym).quantity * coin.latest_price, 2)}</div>
  }

const handleOrderAmountChange = (value) => {
  //VALIDATE ORDER AMOUNT
  console.log('value to set orderAmount to: ', value);
  console.log('orderAmount before its set: ', orderAmount);
  setOrderAmount(value);
  console.log('orderAmount after its set: ', orderAmount);
  calculateTotals(value);
}

const calculateTotals = (value) => {
  let total_fiat;
  let total_coin;

  if (orderUnits === 'usd') {
    total_fiat = parseFloat(value);
    total_coin = parseFloat(value) / coin.latest_price;
    console.log('total_coin: ', total_coin);
    console.log('total_fiat: ', total_fiat);
    setTotalTradeFiat(total_fiat);
    setTotalTradeCoin(total_coin);
  } else if (orderUnits === 'coin') {
    //round down value at the fifth digit place
    total_fiat = parseFloat(value) * coin.latest_price;
    total_coin = parseFloat(value);
    setTotalTradeFiat(total_fiat);
    setTotalTradeCoin(total_coin);
  }
}

const capitalizeFirstLetter = (str) => {
  let word = str[0].toUpperCase();
  word += str.slice(1);
  return word;
}

const submitOrder = async () => {
  console.log("orderAmount: ", orderAmount);
  console.log("coin.latest_price: ", coin.latest_price);
  console.log("total_trade_fiat: ", total_trade_fiat);
  console.log("total_trade_coin: ", total_trade_coin);

  try {
    const orderResult = await axios.post(`/users/${authenticatedUser}/transactions/${orderType}`, {
      coin_id: coin.id,
      currency: 'usd',
      purchase_price: coin.latest_price,
      'total_trade_coin': total_trade_coin,
      'total_trade_fiat': total_trade_fiat,
      trader_id: authenticatedUser,
      coinName: coin.name
    })
    setOrderAmount("");
  }
  catch (e) {
    console.error(e);
  }
}

const handleUnitsConversion = () => {
  if (orderUnits === 'usd') {
    setOrderUnits('coin');
    //take existing order amount and convert it to coin quantity
    setOrderAmount(total_trade_coin);
  } else if (orderUnits === 'coin') {
    setOrderUnits('usd');
    //take existing order amount and convert it to coin quantity
    setOrderAmount(total_trade_fiat);
  }
}

return (
  <div className="flex flex-col items-center justify-between space-y-8 w-1/3 bg-zinc-700 rounded-xl">
    <div className="flex w-full h-16">
      {buyButton}
      {sellButton}
    </div>
    <div className="flex justify-between gap-4">
      <div>
        <button className="self-start hover:bg-zinc-600" onClick={handleUnitsConversion}>
          <IconContext.Provider value={{ size: "2em" }}>
            <HiOutlineSwitchVertical />
          </IconContext.Provider>
        </button>
        {convertButton}
      </div>
      <div className="">
        {console.log('orderAmount in return: ', orderAmount)}
        {orderInput}
        {maxOrderAmountMessage}
      </div>
    </div>
    {sellAll}
    <div className="flex justify-between gap-4 h-10">
      <div className="self-center">{capitalizeFirstLetter(orderType)}</div>
      <select className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" value={coin.name} onChange={(event) => {
        const coinIndex = coins.findIndex(coin => coin.name === event.target.value);
        setCoin(coins[coinIndex]);
        handleOrderAmountChange("");
      }}>
       {coinOrderList}
      </select>
    </div>
    <div className="flex justify-between gap-4">
      <div className="">Price</div>
      <div className="">{`$${coin.latest_price}`} / {coin.acronym.toUpperCase()}</div>
    </div>
    <div>
      <button onClick={submitOrder} name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Submit Order</button>
    </div>
  </div>
)
}

export default Order;