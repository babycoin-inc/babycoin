import React from 'react';

function Balance() {
  return (
    <div className="flex flex-col w-5/12 p-6 bg-zinc-800 border-2 border-zinc-900 rounded">
      <h2 className="text-left text-zinc-400">Your Balance:</h2>
      <h1 className="text-center text-7xl text-white mt-6">$800</h1>
      <h3 className="text-center text-xl mt-2 text-green-400">Profits: +$300</h3>
      <button name="reset" className="text-sm mt-8 border-2 border-orange-500 text-orange-500 rounded-3xl w-fit py-2 px-5 mx-auto hover:bg-orange-500 hover:text-zinc-800">RESET TO $500</button>
    </div>
  )
}

export default Balance;