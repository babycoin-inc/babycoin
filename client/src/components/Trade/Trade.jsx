import React, { useState } from 'react';
import Buy from './Buy.jsx';
import Sell from './Sell.jsx';

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
            <button class="basis-1/2 border-2 border-green-400">Buy</button>
            <button class="basis-1/2 border-2 border-green-400">Sell</button>
            {/* {orderType === 'buy' ? <Buy /> : <Sell />} */}
          </div>
          <input type="text" value="Order Amount"/>
        </div>
      </div>
    </div>
  )
}

export default Trade;