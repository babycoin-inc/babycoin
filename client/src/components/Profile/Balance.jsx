import React from 'react';

function Balance() {
  return (
    <div className="flex flex-col items-center justify-between w-5/12 p-5 border-2 border-blue-400">
      <h2>Your Balance:</h2>
      <h1>$800</h1>
      <h3>Profits: +$300</h3>
      <button>Reset To $500</button>
    </div>
  )
}

export default Balance;