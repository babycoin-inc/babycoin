import React from 'react';
import ReactDOM from 'react-dom';

function ResetModal({ showResetModal, setShowResetModal, handleResetClick}) {
  if (!showResetModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-zinc-900/90 flex items-center justify-center text-red-500 z-30" onClick={() => setShowResetModal(false)}>
      <div className="bg-zinc-800 px-24 py-8 text-zinc-100 rounded-xl drop-shadow-xl absolute top-60" onClick={e => e.stopPropagation()}>
        <div className="p-4 pb-8">
          <h2 className="text-center text-4xl">Resetting Your Account Will:</h2>
        </div>
        <div className="text-lg">
          <div className="bg-zinc-700 pl-10 pr-6 py-4 rounded-xl flex flex-col gap-1">
            <li>Return your account balance to $500 USD</li>
            <li>Remove all assets from your portfolio</li>
            <li>Clear your trade history and</li>
            <li>Reset any anchievements</li>
          </div>
          <h3 className="mt-6 text-center text-2xl">Are you sure you wish to continue?</h3>
        </div>
        <div className="flex flex-col">
          <button name="reset" onClick={handleResetClick} className="text-sm mt-8 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl w-fit py-2 px-5 mx-auto hover:bg-zinc-700 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400">CONFIRM ACCOUNT RESET</button>
          <button className="mt-2" onClick={() => setShowResetModal(false)}>Close</button>
        </div>
      </div>
    </div>, document.getElementById('root')
  );
}

export default ResetModal;