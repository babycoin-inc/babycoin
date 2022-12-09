import React, { useState } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import Newsfeed from '../Newsfeed/newsfeed.jsx'
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { IconContext } from "react-icons";

function Trade() {
  const [orderType, setOrderType] = useState('buy');

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <div className="flex w-3/5 p-5 border-2 border-blue-400">
          Graph
        </div>
        <div className="flex flex-col items-center justify-between space-y-8 w-1/3 bg-zinc-700 rounded-xl border-2 border-blue-400">
          <div className="flex w-full h-16 border-2 border-red-400">
            <button className="basis-1/2 border-2 border-green-400 text-xl">Buy</button>
            <button className="basis-1/2 border-2 border-green-400 text-xl">Sell</button>
            {/* {orderType === 'buy' ? <Buy /> : <Sell />} */}
          </div>
          <div className="flex justify-between gap-4 border-2 border-red-400">
            <div>
              <button className="self-start border-2 border-green-400" >
                <IconContext.Provider value={{ size: "2em" }}>
                  <HiOutlineSwitchVertical />
                </IconContext.Provider>
              </button>
              <div className="self-start text-sm text-center">BTC</div>
            </div>
            <div className="">
              <input className="border-2 h-14 border-green-400 text-xl text-center" type="text" value="Order Amount" />
              <div className="text-sm text-center">You can buy up to $X.00</div>
            </div>
          </div>
          <div className="flex justify-between gap-4 h-10 border-2 border-red-400">
            <div className="self-center border-2 border-green-400">Buy</div>
            <select className="text-center">
              <option selected value="bitcoin">Bitcoin</option>
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
          <div className="flex justify-between gap-4 border-2 border-red-400">
            <div className="border-2 border-green-400">Price</div>
            <div className="border-2 border-green-400">$16,000 / BTC</div>
          </div>
          <div>
            <button name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Buy</button>
            <div>
              <button>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

      export default Trade;