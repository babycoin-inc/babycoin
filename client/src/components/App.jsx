import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Achievements from "./Achievements/Achievements.jsx";
import Trade from './Trade/Trade.jsx';
import axios from 'axios';

function App() {

  const [activePage, setActivePage] = useState('Achievements');
  const [authenticatedUser, setAuthenticatedUser] = useState(1); //temp trader_id

  //Home Component States
  const [accountValue, setAccountValue] = useState(400);
  const [profits, setProfits] = useState(accountValue - 500);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);

  //Achievements Component States
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [latestAchievement, setLatestAchievement] = useState([]);

  const getAchievements = async () => {
    const achievements = await axios.get(`/achievements`);
    setAchievements(achievements.data);
  };
  const getUserAchievements = async () => {
    const userAchievements = await axios.get(`/achievements/${authenticatedUser}`);
    setUserAchievements(userAchievements.data);
  };

  //App On-Mount Effects
  useEffect(() => {
    getAchievements();
    getUserAchievements();

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
    activeComponent = (<h1>Insert Leader Board</h1>);
  } else if (activePage === 'Achievements') {
    activeComponent = (<Achievements achievements={achievements} userAchievements={userAchievements} />);
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