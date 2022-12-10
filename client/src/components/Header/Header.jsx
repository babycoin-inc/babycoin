import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

function Header({ activePage, handleChangeDropdown}) {
  return (
    <>
      <div className="h-4/6 flex justify-between items-center p-5 border-b-2 border-neutral-800">
        <div className="w-1/5 text-2xl">
          <h1>{activePage}</h1>
        </div>
        <div className="w-1/3">
          <select className="text-center text-2xl bg-zinc-800" name="Coin Drop Down" onChange={handleChangeDropdown}>
            <option value="N/A">Choose Your Coin</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Tether">Tether</option>
            <option value="BNB">BNB</option>
            <option value="Cardano">Cardano</option>
            <option value="XRP">XRP</option>
            <option value="Solana">Solana</option>
            <option value="Dogecoin">Dogecoin</option>
            <option value="Polygon">Polygon</option>
            <option value="Polkadot">Polkadot</option>
          </select>

        </div>
        <div className="w-1/5">
          <UserIcon className="h-12 ml-auto bg-zinc-800 p-2 rounded-full hover:bg-zinc-600" />
        </div>
      </div>
      <div className="h-2/6 border-b-2 border-neutral-800">
      <coingecko-coin-price-marquee-widget  className="w-full" coin-ids="bitcoin,ethereum,polkadot,tether,binancecoin,cardano, dogecoin, ripple, solana" currency="usd" background-color="#18181B" locale="en" font-color="#F5F5F5" width="1050"></coingecko-coin-price-marquee-widget>
      </div>
    </>
  )
}

export default Header;