import React, { useState } from 'react';
import ConvertUnits from './ConvertUnits.jsx';
import OrderInput from './OrderInput.jsx';
import OrderMessage from './OrderMessage.jsx';

function OrderForm({orderUnits, coin}) {

  return (
    <div className="flex justify-between gap-4">
      <ConvertUnits orderUnits={orderUnits} coin={coin}/>
      <div>
        <OrderInput orderUnits={orderUnits}/>
        <OrderMessage orderUnits={orderUnits} coin={coin}/>
      </div>
    </div>
  )
}

export default OrderForm;