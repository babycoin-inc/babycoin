import React from 'react';
import BabyCoinLogo from '../../../dist/assets/BabyCoin.png';

function Sidebar() {
  return (
    <div className="w-1/5 border-2 border-red-200">
      <div className="h-full border-2 border-red-600">
        <div className="h-1/6">
          <img src={BabyCoinLogo} width="100" className="relative left-4 top-3" />
        </div>
        <nav className="flex flex-col justify-between items-center mt-16 w-full text-2xl gap-3">
          <h2>Home</h2>
          <h2>Trade</h2>
          <h2>Leader Board</h2>
          <h2>Achievements</h2>
          <h2>Support</h2>
        </nav>
        <div className="mt-36">
          <h2>Watchlist Placeholder</h2>
        </div>
      </div>
     </div>
  )
}

export default Sidebar;