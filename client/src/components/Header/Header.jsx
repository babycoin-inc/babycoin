import React, { useState } from 'react';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { TradingViewEmbed, widgetType, TickerTape } from "react-tradingview-embed";
import Dropdown from './Dropdown.jsx';
import axios from 'axios';
import MoveTicker from './TickerTape.jsx';

function Header({ activePage, tradeHistory, setAuthorizedUser, addToWatchlist, handleMultiChange, coins, handleCoinClick}) {
  const [profilePic, setProfilePic] = useState(true);

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get('/logout')
      .then(result => {
        console.log('DATA FROM LOGOUT', result.data)
        setAuthorizedUser(result.data)
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <div className="h-4/6 flex justify-between items-center px-5 border-b-2 border-neutral-800 bg-zinc-900">
        <div className="w-fit text-2xl">
          <h1>{activePage}</h1>
        </div>
        <div className="w-fit">
          <Dropdown className="h-max-10" tradeHistory={tradeHistory} addToWatchlist={addToWatchlist} handleMultiChange={handleMultiChange} />
        </div>
        <div className="flex justify-between w-fit">
          <div className="flex-col w-fit py-4" onMouseEnter={() => setProfilePic(false)} onMouseLeave={() => setProfilePic(true)}>
            {profilePic && <UserIcon className="h-14 mx-auto bg-zinc-800 p-2 rounded-full text-zinc-300" />}
            {!profilePic &&
            <div onClick={handleLogout}>
              <ArrowRightOnRectangleIcon className="h-10 mx-auto text-zinc-300 cursor-pointer px-2" />
              <h6 className="text-center text-xs text-zinc-300 tracking-widest">Logout</h6>
            </div>}
          </div>
        </div>
      </div>
      <div className="h-2/6 border-b-2 border-neutral-800 bg-zinc-900">
      <MoveTicker coins={coins} handleCoinClick={(e) => handleCoinClick(e)}/>

      {/*
      coingecko ticker widget
      <coingecko-coin-price-marquee-widget  className="w-full" coin-ids="bitcoin, ethereum, polkadot, tether, binancecoin, cardano, dogecoin, ripple, solana" currency="usd" background-color="#18181B" locale="en" font-color="#F5F5F5" width="1050"></coingecko-coin-price-marquee-widget>
      */}
      {/*
      tradingview ticker widget
      <TickerTape
        widgetProps={{
          "symbols": [
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "description": "Tether",
              "proName": "BINANCEUS:USDTUSD"
            },
            {
              "description": "BNB",
              "proName": "BINANCE:BNBUSD"
            },
            {
              "description": "Cardano",
              "proName": "BINANCE:ADAUSD"
            },
            {
              "description": "XRP",
              "proName": "BITSTAMP:XRPUSD"
            },
            {
              "description": "Solana",
              "proName": "BINANCE:SOLUSD"
            },
            {
              "description": "Dogecoin",
              "proName": "BINANCE:DOGEUSD"
            },
            {
              "description": "Polygon",
              "proName": "BINANCE:MATICUSD"
            },
            {
              "description": "Polkadot",
              "proName": "BINANCE:DOTUSD"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "regular",
          "locale": "en"
        }}
      /> */}
      </div>
    </>
  )
}

export default Header;