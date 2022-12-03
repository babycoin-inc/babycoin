import React from 'react';
import Balance from './Balance.jsx';
import AchievementWidget from './AchievementWidget.jsx';
import OpenTrades from './OpenTrades.jsx';
import TradeHistory from './TradeHistory.jsx';

function Profile() {
  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <Balance />
        <AchievementWidget />
      </div>
        <OpenTrades />
        <TradeHistory />
    </div>
  )
}

export default Profile;