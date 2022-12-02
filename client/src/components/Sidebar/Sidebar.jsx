import React from 'react';
import BabyCoinLogo from '../../../dist/assets/BabyCoin.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_content">
        <img src={BabyCoinLogo} width="100" />
        <nav>
          <h2>Home</h2>
          <h2>Trade</h2>
          <h2>Leader Board</h2>
          <h2>Achievements</h2>
          <h2>Support</h2>
        </nav>
        <div>
          <h2>Watchlist Placeholder</h2>
        </div>
      </div>
     </div>
  )
}

export default Sidebar;