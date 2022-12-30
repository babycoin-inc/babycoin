import React, { useState } from 'react';
import BabyCoinLogo from '../../../dist/assets/BabyCoinDark.png';
import BabyCoinBlink from '../../../dist/assets/BabyCoinDarkBlink.png';
import Watchlist from './Watchlist.jsx';

const pages = ['Home', 'Market Watch', 'Trade', 'Leader Board', 'Achievements'];

function Sidebar({ handleNavClick, activePage, tradeHistory, userWatchlist, coins, removeFromWatchlist, authenticatedUser, handleCoinClick, goToMarketwatch }) {

  const [blinking, setBlinking] = useState(false);

  let hasMadeTrades = false;
  if (tradeHistory.length >= 1) {
    hasMadeTrades = true;
  }

  const navItems = pages.map((page, index) => {
    if (index === 1 && !hasMadeTrades) {
      return (
        <div key={index} className={`flex-col text-center w-11/12 pt-3 hover:ml-6 ${activePage === page ? 'rounded-l-3xl ml-6' : ''}`}>
          <div className='flex justify-center'>
            <img alt="Down 3 icon" srcSet="https://img.icons8.com/windows/512/down3.png" style={{width: '15px', height: '15px', filter: 'invert(52%) sepia(69%) saturate(489%) hue-rotate(111deg) brightness(96%) contrast(96%)'}} className='self-end' />
            <h5 className='text-sm text-emerald-300 italic'>Research Your Crypto</h5>
            <img alt="Down 3 icon" srcSet="https://img.icons8.com/windows/512/down2.png" style={{width: '15px', height: '15px', filter: 'invert(52%) sepia(69%) saturate(489%) hue-rotate(111deg) brightness(96%) contrast(96%)'}} className='self-end' />
          </div>
          <button onClick={handleNavClick} name={page} key={page + index} className={`text-center w-full pb-3 px-2 ${activePage === page ? 'bg-zinc-800 rounded-l-3xl pt-3' : 'pt-1'}`}>{page}</button>
        </div>
      )
    }
    return (
      <button onClick={handleNavClick} name={page} key={page + index} className={`text-center w-11/12 py-3 px-2 hover:ml-6 ${activePage === page ? 'bg-zinc-800 rounded-l-3xl ml-6' : ''}`}>{page}</button>
    )
  });

  return (
    <div className="w-64 border-r-2 border-zinc-800">
      <div className="sticky top-0">
        <div className="h-1/6" onMouseEnter={(() => setBlinking(true))} onMouseLeave={() => setBlinking(false)}>
          {!blinking && <img src={BabyCoinLogo} width="110" className="relative mx-auto mt-2" />}
          {blinking && <img src={BabyCoinBlink} width="110" className="relative mx-auto mt-2" />}
        </div>
        <nav className="flex flex-col items-center mt-20 w-full text-2xl">
          {navItems}
          <a href="mailto:support@babycoin.com?subject=Support Request" target="_blank">
            <button name="Support" className="text-center w-11/12 py-3 px-2 hover:ml-6">Support</button>
          </a>
        </nav>
        <div className="mt-28">
          <h2 className="text-center">Watchlist</h2>
          <Watchlist userWatchlist={userWatchlist} coins={coins} removeFromWatchlist={removeFromWatchlist} authenticatedUser={authenticatedUser} handleCoinClick={handleCoinClick} goToMarketwatch={goToMarketwatch} />
        </div>
      </div>
     </div>
  )
}

export default Sidebar;