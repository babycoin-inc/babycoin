import React, { useState, useEffect } from 'react';
import Balance from './Balance.jsx';
import AchievementWidget from './AchievementWidget.jsx';
import Portfolio from './Portfolio.jsx';
import TradeHistory from './TradeHistory.jsx';

function Home(props) {
  const { accountValue, handleResetClick, profits, portfolio, tradeHistory, userAchievements } = props;

  return (
    <div className="flex flex-col justify-between gap-8 pb-10">
      <div className="flex justify-between">
        <Balance accountValue={accountValue} profits={profits} handleResetClick={handleResetClick} />
        <AchievementWidget userAchievements={userAchievements} />
      </div>
        <Portfolio portfolio={portfolio} />
        <TradeHistory tradeHistory={tradeHistory} />
    </div>
  )
}

export default Home;