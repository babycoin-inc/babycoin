import React from 'react';
import BabyCoinLogo from '../../../dist/assets/BabyCoin.png';

function Sidebar() {
  return (
    <div className="w-1/5 border-r-2 border-zinc-700">
      <div className="h-full">
        <div className="h-1/6">
          <img src={BabyCoinLogo} width="100" className="relative left-4 top-3" />
        </div>
        <nav className="flex flex-col justify-between items-center mt-16 w-full text-2xl gap-3">
          <h2>Home</h2>
          <h2>Market Watch</h2>
          <h2>Leader Board</h2>
          <h2>Achievements</h2>
          <h2>Support</h2>
        </nav>
        <div className="mt-36">
          <h2 className="text-center">Watchlist Placeholder</h2>
        </div>
      </div>
     </div>
  )
}

export default Sidebar;