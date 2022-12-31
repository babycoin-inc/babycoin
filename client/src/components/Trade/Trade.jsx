import React, { useState, useCallback, useEffect } from 'react';
// import Order from './Order.jsx';
import Order from './Order.jsx';
import Newsfeed from '../Newsfeeds/newsfeed.jsx'
import Graph from './Graph.jsx';
import Confirmation from './Confirmation.jsx';

function Trade({authenticatedUser, portfolio, coins, getPortfolioData, symbol, setSymbol, achievementsStatus, grantUserAchievement, setActivePage, getTradeHistory, coin}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transaction, setTransaction] = useState({});

  const openAndPopulateModal = (transactionObj) => {
    setModalIsOpen(true);
    setTransaction(transactionObj);
  }

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div className="flex pl-8">
        <img className="w-10" src={coin.image === undefined ? "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" : coin.image} />
        <span className="text-4xl font-extrabold px-1">{coin.name === undefined ? "Bitcoins" : coin.name}({symbol.toUpperCase()})</span>
      </div>
      <div className="flex justify-between gap-4">
        <Confirmation modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} transaction={transaction} setActivePage={setActivePage}/>
        <div className="flex pl-7">
          <Graph coin={symbol} />
        </div>
        <Order authenticatedUser={authenticatedUser} portfolio={portfolio} coins={coins} getPortfolioData={getPortfolioData} openAndPopulateModal={openAndPopulateModal} symbol={symbol} setSymbol={setSymbol} achievementsStatus={achievementsStatus} grantUserAchievement={grantUserAchievement} getTradeHistory={getTradeHistory} />
      </div>
      <Newsfeed coin={symbol} />
    </div>
  )
}

export default Trade;