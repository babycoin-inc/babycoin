import React, { useState, useEffect } from 'react';
import Balance from './Balance.jsx';
import AchievementWidget from './AchievementWidget.jsx';
import Portfolio from './Portfolio.jsx';
import TradeHistory from './TradeHistory.jsx';


const dummyPortfolio = [];
const dummyTradeHistory = [];


function Home() {
  const [accountValue, setAccountValue] = useState(400);
  const [profits, setProfits] = useState(accountValue - 500);
  const [recentAchievement, setRecentAchievement] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);

  // useEffect(() => {

  // });

  async function handleResetClick () {
    setAccountValue(500);
    setProfits(0);
  };

  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <Balance accountValue={accountValue} profits={profits} handleResetClick={handleResetClick} />
        <AchievementWidget recentAchievement={recentAchievement} />
      </div>
        <Portfolio portfolio={portfolio} />
        <TradeHistory tradeHistory={tradeHistory} />
    </div>
  )
}

export default Home;