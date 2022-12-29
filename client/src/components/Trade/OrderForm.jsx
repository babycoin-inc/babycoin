import React, { useState } from 'react';
import ConvertUnits from './ConvertUnits.jsx';
import OrderInput from './OrderInput.jsx';
import OrderMessage from './OrderMessage.jsx';
import SellAll from './SellAll.jsx';

function OrderForm({orderUnits, setOrderUnits, coin, orderType, getCash, calculateSetTotals, total_trade_coin, total_trade_fiat, orderAmount, setOrderAmount, isOrderValid, quantityOfCoin, roundNumUpToDigit, setSellAll, sellAll}) {
  let sellAllButton;

  if (orderType === 'sell') {
    sellAllButton =   <div className="flex">
    {orderType === 'sell' ? <SellAll quantityOfCoin={quantityOfCoin} setOrderAmount={setOrderAmount} coin={coin} orderUnits={orderUnits} roundNumUpToDigit={roundNumUpToDigit} setSellAll={setSellAll} sellAll={sellAll}/> : undefined}
  </div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between gap-4">
        <ConvertUnits orderUnits={orderUnits} setOrderUnits={setOrderUnits} coin={coin} total_trade_coin={total_trade_coin} total_trade_fiat={total_trade_fiat} setOrderAmount={setOrderAmount} />
        <div>
          <OrderInput orderUnits={orderUnits} orderAmount={orderAmount} setOrderAmount={setOrderAmount} isOrderValid={isOrderValid} />
          <OrderMessage orderUnits={orderUnits} coin={coin} orderType={orderType} getCash={getCash} isOrderValid={isOrderValid} quantityOfCoin={quantityOfCoin} roundNumUpToDigit={roundNumUpToDigit} orderAmount={orderAmount} total_trade_coin={total_trade_coin}/>
        </div>
      </div>
      {sellAllButton}
    </div>
  )
}

export default OrderForm;