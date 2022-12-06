import React from 'react';
import Balance from './Balance.jsx';
import AchievementWidget from './AchievementWidget.jsx';
import Portfolio from './Portfolio.jsx';
import TradeHistory from './TradeHistory.jsx';

function Home() {
  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <Balance />
        <AchievementWidget />
      </div>
        <Portfolio />
        <TradeHistory />
    </div>
  )
}

export default Home;