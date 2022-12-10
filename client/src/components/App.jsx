import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Achievements from "./Achievements/Achievements.jsx";
import Trade from './Trade/Trade.jsx';
import Leaderboard from './Leaderboard/Leaderboard.jsx';

function App() {

  const [authenticatedUser, setAuthenticatedUser] = useState(1);
  const [activePage, setActivePage] = useState('Home');

  //Home Component States
  const [accountValue, setAccountValue] = useState(400);
  const [profits, setProfits] = useState(accountValue - 500);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);


  useEffect(() => {
    // retrieve account value
    // retrieve portfolio
    // retrieve tradehistory
  }, []);

  useEffect(() => {
    setProfits(accountValue - 500);
  }, [accountValue]);


  // Home-Balance component reset button
  function handleResetClick () {
    // add routes to delete data from database and clear transactions
    setAccountValue(500);
  };

  function handleNavClick(e) {
    e.preventDefault();
    setActivePage(e.target.name);
  }

  let activeComponent;

  // INSERT YOUR COMPONENTS BASED OFF THE ACTIVE PAGE BELOW
  if (activePage === 'Home') {
    activeComponent = (<Home accountValue={accountValue} handleResetClick={handleResetClick} profits={profits} tradeHistory={tradeHistory} />);
  } else if (activePage === 'Market Watch') {
    activeComponent = (<h1>Insert Market Watch</h1>);
  } else if (activePage === 'Trade') {
    activeComponent = (<Trade />);
  } else if (activePage === 'Leader Board') {
    activeComponent = (<Leaderboard />);
  } else if (activePage === 'Achievements') {
    activeComponent = (<Achievements />);
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto min-h-screen text-neutral-100 bg-zinc-900 border-2 border-zinc-800">
      <Sidebar handleNavClick={handleNavClick} activePage={activePage} />
      <div className="w-full h-full">
        <div className="h-1/6">
          <Header activePage={activePage} />
        </div>
        <div className="p-8 h-full bg-zinc-800">
          {activeComponent}
        </div>
      </div>
    </div>
  )
}

export default App;