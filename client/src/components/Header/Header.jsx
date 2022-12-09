import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import Dropdown from './Dropdown.jsx';

function Header({ activePage }) {
  return (
    <>
      <div className="h-4/6 flex justify-between items-center p-5 border-b-2 border-neutral-800">
        <div className="w-1/5 text-2xl">
          <h1>{activePage}</h1>
        </div>
        <div className="w-1/3">
          {/* <h1 className="text-center text-2xl">Coin Drop Down Placeholder</h1> */}
          <Dropdown />
        </div>
        <div className="w-1/5">
          <UserIcon className="h-12 ml-auto bg-zinc-800 p-2 rounded-full hover:bg-zinc-600" />
        </div>
      </div>
      <div className="h-2/6 border-b-2 border-neutral-800">
      <coingecko-coin-price-marquee-widget  className="w-full" coin-ids="bitcoin, ethereum, polkadot, tether, binancecoin, cardano, dogecoin, ripple, solana" currency="usd" background-color="#18181B" locale="en" font-color="#F5F5F5" width="1050"></coingecko-coin-price-marquee-widget>
      </div>
    </>
  )
}

export default Header;