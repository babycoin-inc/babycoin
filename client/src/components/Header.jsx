import React from 'react';

function Header() {
  return (
    <div className="h-1/6 border-2 border-red-400 w-full">
      <div className="nav">
        <h1>Nav</h1>
      </div>
      <div className="ticker">
        <h3>Ticker</h3>
      </div>
    </div>
  )
}

export default Header;