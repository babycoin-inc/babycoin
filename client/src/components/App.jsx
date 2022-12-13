import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Leaderboard from "./Leaderboard/Leaderboard.jsx";
import Achievements from "./Achievements/Achievements.jsx";
import Trade from './Trade/Trade.jsx';
import Market from './MarketWatch/Market.jsx';
import axios from 'axios';

function App() {

  const [authenticatedUser, setAuthenticatedUser] = useState(1);
  const [activePage, setActivePage] = useState('Home');

  //Home Component States
  const [accountValue, setAccountValue] = useState(500);
  const [profits, setProfits] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [coins, setCoins] = useState([]);

  //Achievements Component States
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);

  const getAchievements = async () => {
    try {
      const achievements = await axios.get(`/achievements`);
      setAchievements(achievements.data);
    } catch (err) {
      setAchievements([]);
    }
  };

  const getUserAchievements = async () => {
    try {
      const userAchievements = await axios.get(`/achievements/${authenticatedUser}`);
      setUserAchievements(userAchievements.data);
    } catch(err) {
      setUserAchievements([]);
    }
  };

  //App On-Mount Effects
  useEffect(() => {
    getPortfolioData(authenticatedUser);
    getTradeHistory(authenticatedUser);
    getAchievements();
    getUserAchievements();
    getCoins();
  }, []);

  useEffect(() => {
    getPortfolioData(authenticatedUser);
  }, [tradeHistory]);

  function getPortfolioData(userId) {
    axios.get(`/users/${userId}/balances`)
      .then((data) => {
        setPortfolio(data.data);
        return data.data;
      })
      .then((portfolioData) => {
        let accVal = portfolioData.reduce((acc, asset) => {
          return acc + asset.value;
        }, 0);
        setProfits((accVal - 500).toFixed(2));
        setAccountValue(accVal.toFixed(2));
      })
      .catch(err => console.log(err));
  }

  function getTradeHistory(userId) {
    axios.get(`/users/${authenticatedUser}/transactions/`)
      .then((history) => {
        setTradeHistory(history.data);
      })
      .catch(err => console.log(err));
  }

  function getCoins() {
    axios.get(`/coins/markets`)
    .then((coins) => {
      setCoins(coins.data);
    })
    .catch(err => console.log(err));
  }

  // Home:Balance component reset button
  function handleResetClick (e) {
    e.preventDefault();
    // Resets portfolio & adds $500 cash
    axios.delete(`/users/${authenticatedUser}/portfolio/`)
      .then((res) => {
        let updatedUserAchievements = res.data;
        setTradeHistory([]);
        setUserAchievements(updatedUserAchievements);
      })
      .catch(err => console.log(err));
  };

  // Sidebar Navigation Menu
  function handleNavClick(e) {
    e.preventDefault();
    setActivePage(e.target.name);
  }

  let activeComponent;

  // INSERT YOUR COMPONENTS BASED OFF THE ACTIVE PAGE BELOW
  if (activePage === 'Home') {
    activeComponent = (<Home accountValue={accountValue} handleResetClick={handleResetClick} profits={profits} portfolio={portfolio} tradeHistory={tradeHistory} userAchievements={userAchievements} />);
  } else if (activePage === 'Market Watch') {
    activeComponent = (<Market />);
  } else if (activePage === 'Trade') {
    activeComponent = (<Trade />);
  } else if (activePage === 'Leader Board') {
    activeComponent = (<Leaderboard />);
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
