import React from 'react';

function Balance() {
  return (
    <div className="flex flex-col w-5/12 p-6 bg-zinc-700 rounded-xl drop-shadow">
      <h2 className="text-left text-zinc-400">Your Balance:</h2>
      <h1 className="text-center text-7xl text-white mt-6">$800</h1>
      <h3 className="text-center text-xl mt-2 text-green-400">Profits: +$300</h3>
      <button name="reset" className="text-sm mt-8 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl w-fit py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400">RESET TO $500</button>
    </div>
  )
}

export default Balance;

