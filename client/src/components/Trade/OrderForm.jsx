import React, { useState } from 'react';
import ConvertUnits from './ConvertUnits.jsx';
import OrderInput from './OrderInput.jsx';
import OrderMessage from './OrderMessage.jsx';

function OrderForm({orderUnits, setOrderUnits, coin, orderType, getCash, calculateSetTotals, total_trade_coin, total_trade_fiat, orderAmount, setOrderAmount, isOrderValid, quantityOfCoin}) {

  return (
    <div className="flex justify-between gap-4">
      <ConvertUnits orderUnits={orderUnits} setOrderUnits={setOrderUnits} coin={coin} total_trade_coin={total_trade_coin} total_trade_fiat={total_trade_fiat} setOrderAmount={setOrderAmount}/>
      <div>
        <OrderInput orderUnits={orderUnits} orderAmount={orderAmount} setOrderAmount={setOrderAmount} isOrderValid={isOrderValid}/>
        <OrderMessage orderUnits={orderUnits} coin={coin} orderType={orderType} getCash={getCash} isOrderValid={isOrderValid} quantityOfCoin={quantityOfCoin}/>
      </div>
    </div>
  )
}

export default OrderForm;