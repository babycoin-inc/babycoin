import React, { useState, useCallback, useEffect } from 'react';
// import Order from './Order.jsx';
import Order from './Order.jsx';
import Newsfeed from '../Newsfeeds/newsfeed.jsx'
import Graph from './Graph.jsx';
import Confirmation from './Confirmation.jsx';

function Trade({authenticatedUser, portfolio, coins, getPortfolioData, symbol, achievementsStatus, grantUserAchievement, setActivePage, coinName}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transaction, setTransaction] = useState({});

  const openAndPopulateModal = (transactionObj) => {
    setModalIsOpen(true);
    setTransaction(transactionObj);
  }

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <h3 class="text-4xl font-extrabold">{coinName}({symbol})</h3>
      <div className="flex justify-between gap-4">
        <div className="flex w-3/5 p-5">
          <Graph coin={symbol} />
        </div>
        <Confirmation modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} transaction={transaction} setActivePage={setActivePage} />
        <Order authenticatedUser={authenticatedUser} portfolio={portfolio} coins={coins} getPortfolioData={getPortfolioData} openAndPopulateModal={openAndPopulateModal} symbol={symbol} achievementsStatus={achievementsStatus} grantUserAchievement={grantUserAchievement} />
      </div>
      <Newsfeed coin={symbol} />
    </div>
  )
}

export default Trade;