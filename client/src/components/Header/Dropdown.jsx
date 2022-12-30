import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Dropdown = ({ tradeHistory, addToWatchlist, handleCoinSelect }) => {

  const options = [
    {value: "Bitcoin", label: "Bitcoin"},
    {value: "Ethereum", label: "Ethereum"},
    {value: "Tether", label: "Tether"},
    {value: "BNB", label: "BNB"},
    {value: "Cardano", label: "Cardano"},
    {value: "XRP", label: "XRP"},
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
      <h5 className='text-base text-emerald-300 italic ml-1'>Add Coins To Watchlist</h5>
    </div>
  )

  return (
    <div className="flex flex-row">
      <div className="w-9/10">
        <Select className="z-10 text-black w-80"
          placeholder="Tradeable Coins"
          onChange={handleCoinSelect}
          options={options}
        />
      </div>
      <div className="pl-2">
        <button onClick={addToWatchlist} className="bg-zinc-600 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>
      <div className="flex items-center">
      {!hasMadeTrades && userInstructions}
      </div>
    </div>
  );
}

export default Dropdown;