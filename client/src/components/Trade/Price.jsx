import React, { useState } from 'react';

function Price({coin}) {

  return (
    <div className="flex justify-between gap-4">
      <div className="">Price</div>
      <div className="">{`$${coin.latest_price}`} / {coin.acronym.toUpperCase()}</div>
    </div>
  )
}

export default Price;