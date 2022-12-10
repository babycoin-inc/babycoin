import React from 'react';

const Dropdown = () => {
  return (
    <div>
      <select class="text-white bg-zinc-700">
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
  );
};

export default Dropdown;

