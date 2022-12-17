import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Dropdown = ({ tradeHistory, addToWatchlist, handleMultiChange }) => {

  const options = [
    {value: "Bitcoin", label: "Bitcoin"},
    {value: "Ethereum", label: "Ethereum"},
    {value: "Tether", label: "Tether"},
    {value: "Binance Coin", label: "Binance Coin"},
    {value: "Cardano", label: "Cardano"},
    {value: "Xrp", label: "Xrp"},
    {value: "Solana", label: "Solana"},
    {value: "Dogecoin", label: "Dogecoin"},
    {value: "Polygon", label: "Polygon"},
    {value: "Polkadot", label: "Polkadot"}
  ];

  let hasMadeTrades = false;
  if (tradeHistory.length >= 1) {
    hasMadeTrades = true;
  }

  const userInstructions = (
    <div className='flex ml-1 items-center'>
      <img alt="Left Arrow icon" srcSet="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/512/external-left-arrow-miscellaneous-kiranshastry-solid-kiranshastry.png" style={{width: '30px', height: '30px', filter: 'invert(49%) sepia(84%) saturate(1416%) hue-rotate(124deg) brightness(95%) contrast(86%)'}}></img>
      <h5 className='text-base text-emerald-300 italic ml-1'>Select A Crypto To Trade</h5>
    </div>
  )

  return (
    <div className="flex flex-row">
      <div className="w-9/10">
        <Select
          placeholder="Tradeable Coins"
          onChange={handleMultiChange}
          options={options}
          isMulti
        />
      </div>
      <div>
        <button onClick={addToWatchlist} className="bg-neutral-200 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>
      <div>
      {!hasMadeTrades && userInstructions}
      </div>
    </div>
  );
}

export default Dropdown;