import React, { useState } from 'react';
// import Order from './Order.jsx';
import Order from './Order.jsx';
import Newsfeed from '../Newsfeeds/newsfeed.jsx'
import Graph from './Graph.jsx';
import Confirmation from './Confirmation.jsx';

function Trade({authenticatedUser, portfolio, coins, getPortfolioData, symbol, achievementsStatus, grantUserAchievement, setActivePage}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transaction, setTransaction] = useState({});

  const openAndPopulateModal = (transactionObj) => {
    setModalIsOpen(true);
    setTransaction(transactionObj);
  }

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <Confirmation modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} transaction={transaction} setActivePage={setActivePage}/>
        <div className="flex w-3/5 p-5">
          <Graph symbol={symbol}/>
        </div>
        <Order authenticatedUser={authenticatedUser} portfolio={portfolio} coins={coins} getPortfolioData={getPortfolioData} openAndPopulateModal={openAndPopulateModal} symbol={symbol} achievementsStatus={achievementsStatus} grantUserAchievement={grantUserAchievement}/>
      </div>
      <Newsfeed coin={symbol} achievementsStatus={achievementsStatus} grantUserAchievement={grantUserAchievement}/>
    </div>
  )
}

export default Trade;