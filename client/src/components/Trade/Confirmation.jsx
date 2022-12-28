import React from 'react';
import ReactDOM from 'react-dom';

function Confirmation({ modalIsOpen, setModalIsOpen, transaction, setActivePage}) {
  if (!modalIsOpen) {
    return null;
  }

  let {coin, total_trade_coin, total_trade_fiat, purchase_price, orderType} = transaction;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-zinc-900/90 flex items-center justify-center text-red-500 z-30" onClick={() => setModalIsOpen(false)}>
      <div className="bg-zinc-800 px-24 py-8 text-zinc-100 rounded-xl drop-shadow-xl absolute top-60" onClick={e => e.stopPropagation()}>
        <div className="p-4 pb-8">
          <h2 className="text-center text-4xl">Order Confirmation</h2>
        </div>
        <div className="text-lg">
          <div className="bg-zinc-700 pl-10 pr-6 py-4 rounded-xl flex flex-col gap-1">
            <div>{total_trade_coin} {coin.acronym.toUpperCase()} {orderType === 'buy' ? 'purchased' : 'sold'}</div>
            <div><b>Price</b>: ${purchase_price} / {coin.acronym.toUpperCase()}</div>
            <div>{orderType === 'buy' ? <b>Purchase: </b> : <b>Sale: </b>} ${total_trade_fiat}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <button name="done" onClick={() => setModalIsOpen(false)} className="text-sm mt-8 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl w-fit py-2 px-5 mx-auto hover:bg-zinc-700 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44">Done</button>
          <button className="text-sm mt-8 bg-zinc-800 text-orange-500 font-semibold border border-orange-500 rounded-3xl w-fit py-2 px-5 mx-auto hover:bg-zinc-700 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44" onClick={() => {
             setModalIsOpen(false);
             setActivePage('Home');
          }}>View Trade History</button>
        </div>
      </div>
    </div>, document.getElementById('root')
  );
}

export default Confirmation;