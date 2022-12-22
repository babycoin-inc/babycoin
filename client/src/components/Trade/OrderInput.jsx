import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

function OrderInput({orderUnits, orderAmount, setOrderAmount, isOrderValid}) {
  let orderInput;

  //this is found in both of the order inputs
  let validationErrorStyle;
  if (!isOrderValid) {
    validationErrorStyle = "border-2 border-rose-600 outline-0";
  }

  if (orderUnits === 'usd') {
    orderInput = <NumericFormat className={`h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500 ${validationErrorStyle}`} displayType="input" type="text"  allowNegative={false} valueIsNumericString={true} defaultValue="Order Amount" prefix='$' value={orderAmount} decimalScale={2} allowLeadingZeros={false} thousandSeparator="," onValueChange={(values, sourceInfor) => { setOrderAmount(values.value) }}/>

  } else if (orderUnits === 'coin') {
    orderInput = <NumericFormat className={`h-14 text-xl text-center bg-zinc-400 rounded-xl hover:bg-zinc-500 ${validationErrorStyle}`} displayType="input" type="text" allowNegative={false} valueIsNumericString={true} value={orderAmount}
    defaultValue="Order Amount" decimalScale={5} onValueChange={(values, sourceInfor) => { setOrderAmount(values.value) }}/>
  }

  return (
    orderInput
  )
}

export default OrderInput;