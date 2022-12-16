import React from 'react';
import ReactDOM from 'react-dom';

function ResetModal({ showResetModal, setShowResetModal, handleResetClick}) {
  if (!showResetModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-zinc-900/50 flex items-center justify-center text-red-500 z-30' onClick={() => setShowResetModal(false)}>
      <div className='bg-white' onClick={e => e.stopPropagation()}>
        <div>
          <h2>Resetting Your Account Will:</h2>
        </div>
        <div>
          <h2>Modal Content</h2>
        </div>
        <div>
        <button name="reset" onClick={handleResetClick} className="text-sm mt-8 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl w-fit py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400">CONFIRM ACCOUNT RESET</button>
        <button onClick={() => setShowResetModal(false)}>Close</button>
        </div>
      </div>
    </div>, document.getElementById('root')
  );
}

export default ResetModal;