import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

function OrderInput({orderUnits}) {
  let orderInput;

  // const handleOrderAmountChange = (value) => {
  //   //VALIDATE ORDER AMOUNT
  //   setOrderAmount(value);
  //   calculateTotals(value);
  // }

  if (orderUnits === 'usd') {
    orderInput = <NumericFormat className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" displayType="input" type="text" value={orderAmount} allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" prefix='$' decimalScale={2} allowLeadingZeros={false} thousandSeparator="," />
    // onValueChange={(values, sourceInfor) => { handleOrderAmountChange(values.value) }}
  } else if (orderUnits === 'coin') {
    orderInput = <NumericFormat className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" displayType="input" type="text" value={orderAmount} allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" decimalScale={5} />
    // onValueChange={(values, sourceInfor) => { handleOrderAmountChange(values.value) }}
  }

  return (
    <NumericFormat className="h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500" displayType="input" type="text" allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" prefix='$' decimalScale={2} allowLeadingZeros={false} thousandSeparator="," />
  )
}

export default OrderInput;