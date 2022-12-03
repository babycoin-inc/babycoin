import React from 'react';
// import './profilestyles.css'
import Balance from './Balance.jsx';
import AchievementWidget from './AchievementWidget.jsx';
import OpenTrades from './OpenTrades.jsx';
import TradeHistory from './TradeHistory.jsx';

function Profile() {
  return (
    <div className="profile">
      <div className="top">
        <Balance />
        <AchievementWidget />
      </div>
        <OpenTrades />
        <TradeHistory />
    </div>
  )
}

export default Profile;