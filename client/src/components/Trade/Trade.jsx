import React, { useState } from 'react';
// import Order from './Order.jsx';
import Order from './Order.jsx';
import Newsfeed from '../Newsfeeds/newsfeed.jsx'
import Graph from './Graph.jsx';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Trade({authenticatedUser, portfolio, coins, getPortfolioData, symbol}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [total_trade_fiat, setOrderUSDAmount] = useState('');
  const [total_trade_coin, setOrderCoinAmount] = useState('');
  const [purchase_price, setPriceAmount] = useState('');
  const [coinName, setCoinName] = useState('');
  const [coinAcronym, setCoinAcronym] = useState('');
  const [orderType, setOrderTypeAmount] = useState('');

  const populateModalValues = (transactionObj) => {
    let {coin, total_trade_coin, total_trade_fiat, purchase_price, orderType} = transactionObj;
    setOrderCoinAmount(total_trade_coin);
    setOrderUSDAmount(total_trade_fiat);
    setPriceAmount(purchase_price);
    setCoinName(coin.name);
    setCoinAcronym(coin.acronym);
    setOrderTypeAmount(orderType);
    return;
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  let modal;

  if (modalIsOpen) {
    modal = <div className="flex flex-col items-center justify-between space-y-8 w-1/3 bg-zinc-700 rounded-xl">
      <Modal
        isOpen={modalIsOpen}
        contentLabel="test"
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
      <p> Order Confirmation </p>
      <p>{total_trade_coin} {coinAcronym.toUpperCase()} {orderType === 'buy' ? 'purchased': 'sold'}</p>
      <p>Price ${purchase_price}/{coinAcronym.toUpperCase()}</p>
      <p>{orderType === 'buy' ? 'Purchase': 'Sale'} ${total_trade_fiat}</p>
      <button name="submit" className="text-lg mb-6 bg-orange-400 text-orange-900 font-semibold border border-orange-500 rounded-3xl py-2 px-5 mx-auto hover:bg-zinc-800 hover:border-zinc-800 hover:text-orange-500 active:border active:border-orange-400 h-14 w-44" onClick={closeModal}>Done</button>
      </Modal>
    </div>
  }

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        {modal}
        <div className="flex w-3/5 p-5">
          <Graph symbol={symbol}/>
        </div>
        <Order authenticatedUser={authenticatedUser} portfolio={portfolio} coins={coins} getPortfolioData={getPortfolioData} openModal={openModal} closeModal={closeModal} populateModalValues={populateModalValues} symbol={symbol}/>
      </div>
      <Newsfeed coin={symbol}/>
    </div>
  )
}

export default Trade;