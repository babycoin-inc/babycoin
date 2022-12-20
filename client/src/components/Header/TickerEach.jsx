import React from 'react';

function TickerEach({coin, handleCoinClick}) {
  let change_percentage = Number(coin.price_change_percentage).toFixed(2);

  return (
    <>
      <div className="flex px-3 py-1 hover:bg-green-900/50">
        <img src={coin.image} className="w-7"/>
        <span className="px-1 font-bold	">{coin.name}</span>
        (<span className="" onClick={handleCoinClick}>{coin.acronym.toUpperCase()}</span>)
        <span className="px-1 font-semibold	">${coin.latest_price}</span>
        {change_percentage < 0 ? <span className="text-red-400 px-1">({change_percentage}%)</span> : <span className="text-green-400 px-1">({change_percentage}%)</span>}
      </div>
    </>
  )
}

export default TickerEach;