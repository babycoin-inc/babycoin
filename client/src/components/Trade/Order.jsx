import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { IconContext } from "react-icons";
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

function Order({authenticatedUser, portfolio, coins}) {
  const [orderType, setOrderType] = useState("buy");
  let [orderAmount, setOrderAmount] = useState("");
  const [orderUnits, setOrderUnits] = useState('USD');
  //DEFAULT COIN: CHANGE TO SELECTED COIN
  let [coin, setCoin] = useState(coins[2]);
  console.log('coins: ', coins);
  console.log('portfolio: ', portfolio);

  let view = orderType === 'buy' ? <Buy /> : <Sell />;
  let buyButton;
  let sellButton;

  if (orderType === 'buy') {
    buyButton = <button disabled={true} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto">Buy</button>
    sellButton = <button onClick={() => setOrderType('sell')} className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Sell</button>

  } else if (orderType === 'sell') {
    buyButton = <button onClick={() => setOrderType('buy')} className="basis-1/2 border-2 text-xl bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto active:border active:border-orange-400 hover:bg-orange-500">Buy</button>
    sellButton = <button disabled={true} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto">Sell</button>
  }

  const handleOrderAmountChange = (e) => {
    //VALIDATE ORDER AMOUNT
    setOrderAmount(e.currentTarget.value);
  }

  const capitalizeFirstLetter = (str) => {
    let word = str[0].toUpperCase();
    word += str.slice(1);
    return word;
  }

  const submitOrder = async() => {
    let total_trade_fiat;
    let total_trade_coin;

    if (orderUnits === 'USD') {
      total_trade_fiat = parseFloat(orderAmount.slice(1));
      total_trade_coin =  parseFloat(orderAmount.slice(1)) / coin.latest_price;
    } else if (orderUnits === 'coin') {
      total_trade_fiat = parseFloat(orderAmount) * coin.latest_price;
      total_trade_coin = parseFloat(orderAmount);
    }

    try {
      const orderResult = await axios.post(`/users/${authenticatedUser}/transactions/${orderType}`, {
        currency: 'USD',
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

  return (
        <div className="flex flex-col items-center justify-between space-y-8 w-1/3 bg-zinc-700 rounded-xl">
          <div className="flex w-full h-16">
            {buyButton}
            {sellButton}
          </div>
          <div className="flex justify-between gap-4">
            <div>
              <button className="self-start hover:bg-zinc-600" >
                <IconContext.Provider value={{ size: "2em" }}>
                  <HiOutlineSwitchVertical />
                </IconContext.Provider>
              </button>
              <div className="self-start text-sm text-center">{coin.acronym.toUpperCase()}</div>
            </div>
            <div className="">
            {console.log(orderAmount)}
            <NumericFormat className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500"  displayType="input" type="text" value={orderAmount} allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" prefix='$' decimalScale={2} allowLeadingZeros={false} thousandSeparator="," onValueChange={(values, sourceInfor) => {setOrderAmount(values.value)}}/>
              <div className="text-sm text-center">You can {orderType} up to $500.00</div>
            </div>
          </div>
          <div className="flex justify-between gap-4 h-10">
            <div className="self-center">{capitalizeFirstLetter(orderType)}</div>
            <select className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" value={coin.name} onChange={(event) => {
              const coinIndex = coins.findIndex(coin => coin.name === event.target.value);
              console.log('coinIndex: ', coinIndex);
              console.log("coins[coinIndex]: ", coins[coinIndex]);
              console.log("coins[coinIndex][event.target.value]: ", coins[coinIndex][event.target.value]);
              setCoin(coins[coinIndex])}}>
              {coins.slice(1).map((crypto, index) => {
                return <option value={crypto.name} key={index}>{crypto.name}</option>
              })}
            </select>
          </div>
          <div className="flex justify-between gap-4">
            <div className="">Price</div>
            <div className="">{`$${coin.latest_price}`} / {coin.acronym.toUpperCase()}</div>
          </div>
          <div>
            <button onClick={submitOrder} name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Submit Order</button>
          </div>
          <div>{() => {setCount(count+1)}}</div>
        </div>
  )
}

  export default Order;