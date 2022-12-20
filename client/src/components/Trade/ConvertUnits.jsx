import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { HiOutlineSwitchVertical } from 'react-icons/hi';

function ConvertUnits({orderUnits, coin}) {
  const conversionSymbol = orderUnits === 'usd' ? coin.acronym.toUpperCase() : '$';

  // const handleUnitsConversion = () => {
  //   if (orderUnits === 'usd') {
  //     setOrderUnits('coin');
  //     //take existing order amount and convert it to coin quantity
  //     setOrderAmount(total_trade_coin);
  //   } else if (orderUnits === 'coin') {
  //     setOrderUnits('usd');
  //     //take existing order amount and convert it to coin quantity
  //     setOrderAmount(total_trade_fiat);
  //   }
  // }

  // onClick={handleUnitsConversion}

  return (
    <div>
      <button className="self-start hover:bg-zinc-600" >
        <IconContext.Provider value={{ size: "2em" }}>
          <HiOutlineSwitchVertical />
        </IconContext.Provider>
      </button>
      <div className="self-start text-m text-center">{conversionSymbol}</div>
    </div>
  )
}

export default ConvertUnits;