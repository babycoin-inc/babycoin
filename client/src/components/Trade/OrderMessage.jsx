import React, { useState } from 'react';

function OrderMessage({orderUnits, orderType, coin, getCash, isOrderValid, quantityOfCoin, roundToDecimalPlace, orderAmount}) {
  const cash = getCash().quantity;
  const maxCoinBuyOrderAmount = cash / coin.latest_price;
  let maxOrderAmountMessage;

  if (isOrderValid === false && orderAmount.length !== 0) {
      //validation error styling
      maxOrderAmountMessage = <div className="text-sm text-center text-rose-600">Funds not available</div>
    } else if (orderUnits === 'coin' && orderType === 'buy') {
      maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to {roundToDecimalPlace(maxCoinBuyOrderAmount, 9)} {coin.acronym.toUpperCase()}</div>
    } else if(orderUnits === 'usd' && orderType === 'buy') {
      maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to ${roundToDecimalPlace(cash, 2)}</div>
    } else if(orderUnits === 'coin' && orderType === 'sell') {
      maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to {roundToDecimalPlace(quantityOfCoin, 9)} {coin.acronym.toUpperCase()}</div>
    } else if(orderUnits === 'usd' && orderType === 'sell') {
      maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to ${roundToDecimalPlace(quantityOfCoin * coin.latest_price, 2)}</div>
    }

  return (
    maxOrderAmountMessage
  )
}

export default OrderMessage;