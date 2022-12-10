import React, { useState } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import Newsfeed from '../Newsfeeds/newsfeed.jsx'
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { IconContext } from "react-icons";

function Trade() {
  const [orderType, setOrderType] = useState('buy');
  const [orderAmount, setOrderAmount] = useState('Order Amount');
  const [coin, setCoin] = useState('bitcoin');
  console.log(coin)

  let view = orderType === 'buy' ? <Buy /> : <Sell />;
  let buyButton;
  let sellButton;
  // let disabledStyle = <button disabled={true} className="basis-1/2 border-2 text-xl bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded py-2 px-5 mx-auto">Buy</button>;
  // let nonDisabledStyle;
  // let buyIsDisabled = orderType === 'buy';
  // let sellIsDisabled = orderType === 'sell';

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

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <div className="flex w-3/5 p-5">
          Graph
        </div>
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
            <input onClick={() => {if(orderAmount === 'Order Amount' || orderAmount === '') {setOrderAmount('$')}}} onChange={(event) => {setOrderAmount(event.target.value)}} className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" type="text" value={orderAmount} />
              {/* <input onChange={handleOrderAmountChange.bind(this)} className="h-14 text-xl text-center bg-zinc-400 rounded-xl" type="text" value={orderAmount} defaultValue="Order Amount" /> */}
              <div className="text-sm text-center">You can {orderType} up to $X.00</div>
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
            <div className="">$16,000 / BTC</div>
          </div>
          <div>
            <button name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Submit Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

      export default Trade;