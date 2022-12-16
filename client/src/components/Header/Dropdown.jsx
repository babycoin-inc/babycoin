import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Dropdown = () => {

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

  const [multiValue, setMultiValue] = useState([]);
  const sendObj = {addedList: multiValue};

  const handleMultiChange = (selectedOption) => {
    setMultiValue(selectedOption);
  }

  useEffect(() => {
    sendObj.addedList = multiValue
  })

  const addToWatchlist = (userId) => {
    axios.post(`/users/${userId}/watchlist`, sendObj)
    .then()
    .catch()
  }

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
          Add to Watchlist
        </button>
      </div>
    </div>
  );
}

export default Dropdown;