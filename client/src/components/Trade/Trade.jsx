import React, { useState } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';
import { HiOutlineSwitchVertical } from 'react-icons/hi';

function Trade() {
  const [orderType, setOrderType] = useState('buy');

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div class="flex justify-between">
        <div class="flex w-3/5 p-5 border-2 border-blue-400">
          {/* INSERT GRAPH COMPONENT HERE */}
          Graph
        </div>
        <div class="flex flex-col items-center justify-between w-1/3 border-2 border-blue-400">
          <div class="flex w-full border-2 border-red-400">
            <button className="basis-1/2 border-2 border-green-400">Buy</button>
            <button class="basis-1/2 border-2 border-green-400">Sell</button>
            {/* {orderType === 'buy' ? <Buy /> : <Sell />} */}
          </div>
          <div class="flex justify-between border-2 border-red-400">
          <button className="border-2 border-green-400" ><HiOutlineSwitchVertical/></button>
          <input className="border-2 border-green-400" type="text" value="Order Amount"/>
          </div>
          <span>You can buy up to $X.00</span>
          <div class="flex border-2 border-red-400">
          <div className="border-2 border-green-400">Price</div>
          <div className="border-2 border-green-400">$16,000 / BTC</div>
          </div>
          <div class="flex border-2 border-red-400">
            <div className="border-2 border-green-400">Buy</div>
            <select>
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
          <div>
            <button>Buy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trade;