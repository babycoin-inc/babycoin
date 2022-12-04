import React, { useState } from 'react';
import BabyCoinLogo from '../../../dist/assets/BabyCoin.png';

const pages = ['Home', 'Market Watch', 'Leader Board', 'Achievements', 'Support'];

function Sidebar() {

  const [activePage, setActivePage] = useState('Home');

  function handleNavClick(e) {
    e.preventDefault();
    setActivePage(e.target.name);
  }

  const navItems = pages.map((page, index) => (
    <button onClick={handleNavClick} name={page} key={page + index} className={`text-center w-11/12 py-3 px-2 hover:ml-6 ${activePage === page ? 'bg-zinc-700 rounded-l-3xl ml-6' : ''}`}>{page}</button>
  ));

  return (
    <div className="w-1/5 border-r-2 border-zinc-800">
      <div className="h-full">
        <div className="h-1/6">
          <img src={BabyCoinLogo} width="100" className="relative left-4 top-3" />
        </div>
        <nav className="flex flex-col items-center mt-10 w-full text-2xl">
          {navItems}
        </nav>
        <div className="mt-36">
          <h2 className="text-center">Watchlist Placeholder</h2>
        </div>
      </div>
     </div>
  )
}

export default Sidebar;