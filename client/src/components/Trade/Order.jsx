import React, { useState, useEffect } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { IconContext } from "react-icons";
import axios from 'axios';

function Order({authenticatedUser, portfolio}) {
  const [orderType, setOrderType] = useState('buy');
  let [orderAmount, setOrderAmount] = useState('Order Amount');
  const [orderUnits, setOrderUnits] = useState('USD')
  let [coin, setCoin] = useState('Bitcoin');
  const [price, setPrice] = useState();

  const getCoin = () => {
    axios.get(`/coins/?name=${coin}`)
    .then((response) => {
      setPrice(response.data);
    })
    .catch((err) => {throw err;})
  }

  useEffect(() => {
    console.log("I have been mounted");
    getCoin()
  }, []);

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
      total_trade_coin =  parseFloat(orderAmount.slice(1)) / price;
    } else if (orderUnits === 'coin') {
      total_trade_fiat = parseFloat(orderAmount) * price;
      total_trade_coin = parseFloat(orderAmount);
    }

    console.log(total_trade_fiat);
    console.log(total_trade_coin);

    const orderResult = await axios.post(`/users/${authenticatedUser}/transactions/${orderType}`, {
      currency: 'USD',
      purchase_price: price,
      'total_trade_coin': total_trade_coin,
      'total_trade_fiat': total_trade_fiat,
      trader_id: authenticatedUser,
      coinName: coin
    })
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
              <div className="self-start text-sm text-center">BTC</div>
            </div>
            <div className="">
            <input onClick={() => {if(orderAmount === 'Order Amount' || orderAmount === '') {setOrderAmount('$')}}} onChange={(event) => {if (orderAmount[0] !== '$') {setOrderAmount('$')} else {setOrderAmount(event.target.value)}}} className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" type="text" value={orderAmount} />
              {/* <input onChange={handleOrderAmountChange.bind(this)} className="h-14 text-xl text-center bg-zinc-400 rounded-xl" type="text" value={orderAmount} defaultValue="Order Amount" /> */}
              <div className="text-sm text-center">You can {orderType} up to $500.00</div>
            </div>
          </div>
          <div className="flex justify-between gap-4 h-10">
            <div className="self-center">{capitalizeFirstLetter(orderType)}</div>
            <select className="text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" value={coin} onChange={() => {setCoin(event.target.value)}}>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="tether">Tether</option>
              <option value="bnb">Binance Coin</option>
              <option value="cardano">Cardano</option>
              <option value="xrp">Xrp</option>
              <option value="solana">Solana</option>
              <option value="dogecoin">Dogecoin</option>
              <option value="polygon">Polygon</option>
              <option value="polkadot">Polkadot</option>
            </select>
          </div>
          <div className="flex justify-between gap-4">
            <div className="">Price</div>
            <div className="">{`$${Math.round(price)}`} / BTC</div>
          </div>
          <div>
            <button onClick={submitOrder} name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Submit Order</button>
          </div>
        </div>
  )
}

  export default Order;