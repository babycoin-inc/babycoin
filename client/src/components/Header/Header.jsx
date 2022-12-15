import React, { useState } from 'react';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { TradingViewEmbed, widgetType, TickerTape } from "react-tradingview-embed";
import Dropdown from './Dropdown.jsx';

function Header({ activePage }) {
  const [profilePic, setProfilePic] = useState(true);

  return (
    <>
      <div className="h-4/6 flex justify-between items-center px-5 border-b-2 border-neutral-800">
        <div className="w-1/5 text-2xl">
          <h1>{activePage}</h1>
        </div>
        <div className="w-1/3">
          <Dropdown />
        </div>
        <div className="flex justify-between w-1/5">
          <div></div>
          <div className="flex-col w-2/6 py-4" onMouseEnter={() => setProfilePic(false)} onMouseLeave={() => setProfilePic(true)}>
            {profilePic && <UserIcon className="h-14 mx-auto bg-zinc-800 p-2 rounded-full text-zinc-300" />}
            {!profilePic &&
            // ADD LOGOUT CLICKHANDLER HERE
            <div onClick={() => alert("Log me out")}>
              <ArrowRightOnRectangleIcon className="h-10 mx-auto text-zinc-300" />
              <h6 className="text-center text-xs text-zinc-300 tracking-widest">Logout</h6>
            </div>}
          </div>
        </div>
      </div>
      <div className="h-2/6 border-b-2 border-neutral-800">
      <coingecko-coin-price-marquee-widget  className="w-full" coin-ids="bitcoin, ethereum, polkadot, tether, binancecoin, cardano, dogecoin, ripple, solana" currency="usd" background-color="#18181B" locale="en" font-color="#F5F5F5" width="1050"></coingecko-coin-price-marquee-widget>
      {/* <TickerTape
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