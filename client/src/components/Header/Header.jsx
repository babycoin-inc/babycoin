import React from 'react';

function Header() {
  return (
    <>
      <div className="h-4/6 flex justify-between items-center p-5 border-2 border-red-400">
        <div className="w-1/5 text-2xl">
          <h1>Home</h1>
        </div>
        <div className="w-1/3">
          <h1 className="text-center text-2xl">Coin Drop Down Placeholder</h1>
        </div>
        <div className="w-1/5">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Profile-720.png" className="h-12 ml-auto" />
        </div>
      </div>
      <div className="h-2/6 border-2 border-red-400">
        <h3>Ticker</h3>
      </div>
    </>
  )
}

export default Header;