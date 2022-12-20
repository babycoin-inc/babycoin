import React, { useState } from 'react';

function OrderMessage({orderUnits, orderType, coin}) {
  let maxOrderAmountMessage;

  // if (orderUnits === 'coin' && orderType === 'buy') {
  //   let maxCoinOrderAmount = getAssetFromPortfolio('usd').quantity / coin.latest_price;
  //   maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to {roundNumUpToDigit(maxCoinOrderAmount, 5)} {coin.acronym.toUpperCase()}</div>
  // } else if(orderUnits === 'usd' && orderType === 'buy') {
  //   maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to ${getAssetFromPortfolio('usd').quantity}</div>
  // } else if(orderUnits === 'coin' && orderType === 'sell') {
  //   maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to {roundNumUpToDigit((getAssetFromPortfolio(coin.acronym)).quantity, 5)} {coin.acronym.toUpperCase()}</div>
  // } else if(orderUnits === 'usd' && orderType === 'sell') {
  //   maxOrderAmountMessage = <div className="text-sm text-center">You can {orderType} up to ${roundNumUpToDigit(getAssetFromPortfolio(coin.acronym).quantity * coin.latest_price, 2)}</div>
  // }

  return (
    <div className="text-sm text-center">You can {orderType} up to $500 {coin.acronym.toUpperCase()}
    </div>
  )
}

export default OrderMessage;