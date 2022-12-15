import React from 'react';

const Dropdown = ({ tradeHistory }) => {

  let hasMadeTrades = false;
  if (tradeHistory.length >= 1) {
    hasMadeTrades = true;
  }

  const userInstructions = (
    <div className='flex ml-1 items-center'>
      <img alt="Left Arrow icon" srcset="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/512/external-left-arrow-miscellaneous-kiranshastry-solid-kiranshastry.png" style={{width: '30px', height: '30px', filter: 'invert(49%) sepia(84%) saturate(1416%) hue-rotate(124deg) brightness(95%) contrast(86%)'}}></img>
      <h5 className='text-base text-emerald-300 italic ml-1'>Select A Crypto To Trade</h5>
    </div>
  )

  return (
    <div className='flex justify-center'>
      <div className='flex'>
        <select className="text-white bg-zinc-700">
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tether">Tether</option>
          <option value="bnb">Binance Coin</option>
          <option value="cardano">Cardano</option>
          <option value="xrp">Xrp</option>
          <option value="solana">Solana</option>
          <option value="dogecoin">Dogecoin</option>
          <option value="polygon">Polygon</option>
          <option value="polkadot">Polkadot</option>
        </select>
      </div>
      {!hasMadeTrades && userInstructions}
    </div>
  );
};

export default Dropdown;

