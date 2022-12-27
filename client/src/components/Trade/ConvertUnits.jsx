import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { HiOutlineSwitchVertical } from 'react-icons/hi';

function ConvertUnits({orderUnits, setOrderUnits, coin, setOrderAmount, total_trade_coin, total_trade_fiat}) {
  const conversionSymbol = orderUnits === 'usd' ? coin.acronym.toUpperCase() : '$';

  const handleUnitsConversion = () => {
    if (orderUnits === 'usd') {
      setOrderUnits('coin');
      //take existing order amount and convert it to coin quantity
      setOrderAmount(total_trade_coin);
    } else if (orderUnits === 'coin') {
      setOrderUnits('usd');
      //take existing order amount and convert it to coin quantity
      setOrderAmount(total_trade_fiat);
    }
  }

  return (
    <div>
      <button className="self-start hover:bg-zinc-600"   onClick={handleUnitsConversion}>
        <IconContext.Provider value={{ size: "2em" }}>
          <HiOutlineSwitchVertical />
        </IconContext.Provider>
      </button>
      <div className="self-start text-m text-center">{conversionSymbol}</div>
    </div>
  )
}

export default ConvertUnits;