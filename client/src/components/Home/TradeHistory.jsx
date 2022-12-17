import React from 'react';
import dateFormat from 'dateformat';

function TradeHistory({ tradeHistory }) {

  function orderTypeColor(order_type) {
    if (order_type === 'buy') {
      return (<td className="text-center text-green-400">{order_type.toUpperCase()}</td>);
    } else {
      return (<td className="text-center text-red-400">{order_type.toUpperCase()}</td>);
    }
  };

  let hasMadeTrades = false;
  if (tradeHistory.length >= 1) {
    hasMadeTrades = true;
  }

  const userInstructions = (
    <div className='mx-auto text-emerald-300 text-3xl mt-5 pb-6'>
      <h2 className='text-center'>Let's Make Your First Trade!</h2>
      <div className='flex justify-center mt-4'>
        <div className=''>
          <img alt="Dollar Ethereum Exchange icon" srcSet="https://img.icons8.com/ios-filled/512/exchange-money-ethereum.png" style={{width: '125px', height: '125px', filter: 'invert(50%) sepia(100%) saturate(346%) hue-rotate(111deg) brightness(93%) contrast(100%)'}} />
        </div>
        <div className='ml-8'>
          <div className='flex items-center pb-2'>
            <img alt="1st icon" srcSet="https://img.icons8.com/material-sharp/512/1-circle.png" style={{width: '40px', height: '40px', filter: 'invert(57%) sepia(40%) saturate(3872%) hue-rotate(124deg) brightness(96%) contrast(86%)'}} />
            <h3 className='text-xl pl-2'>Visit "Market Watch" To Research A Cryptocurrency</h3>
          </div>
          <div className='flex items-center pb-2'>
            <img alt="1st icon" srcSet="https://img.icons8.com/fluency-systems-filled/512/2-circle.png" style={{width: '40px', height: '40px', filter: 'invert(57%) sepia(40%) saturate(3872%) hue-rotate(124deg) brightness(96%) contrast(86%)'}} />
            <h3 className='text-xl pl-2'>Select A Crypto To Trade From The Top Dropdown Menu</h3>
          </div>
          <div className='flex items-center'>
            <img alt="1st icon" srcSet="https://img.icons8.com/ios-glyphs/512/3-circle.png" style={{width: '40px', height: '40px', filter: 'invert(57%) sepia(40%) saturate(3872%) hue-rotate(124deg) brightness(96%) contrast(86%)'}} />
            <h3 className='text-xl pl-2'>Get Trading!</h3>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      <div className="bg-zinc-700 rounded-t-xl pt-2.5 px-5 w-fit">
        <h2>Trade History</h2>
      </div>
      <div className="bg-zinc-700 rounded-b-xl rounded-tr-xl px-3 py-5">
        {!hasMadeTrades && userInstructions}
        {hasMadeTrades && (
          <div className="max-h-96 overflow-auto">
            <table className="w-full mx-auto table-auto">
              <thead className="bg-zinc-600 sticky top-0">
                <tr>
                  <th className="p-6"></th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-500">
                {tradeHistory.map((trade, index) => (
                  <tr key={index} className="border-t border-zinc-600  hover:bg-zinc-400">
                    <td className="py-2"><img src={trade.image} className="h-10 mx-auto" /></td>
                    <td className="text-center">{trade.name}<i className="block text-sm">{trade.acronym.toUpperCase()}</i></td>
                    <td className="text-center">${Number(trade.total_trade_fiat).toFixed(2)}<i className="block text-sm">{`${trade.total_trade_coin} ${trade.acronym.toUpperCase()}`}</i></td>
                    <td className="text-center">${Number(trade.purchase_price).toLocaleString("en-US")}</td>
                    {orderTypeColor(trade.order_type)}
                    <td className="text-center">{dateFormat(trade.order_datetime, 'mmm d')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default TradeHistory;
