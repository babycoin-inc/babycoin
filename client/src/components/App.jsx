import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Leaderboard from "./Leaderboard/Leaderboard.jsx";
import Achievements from "./Achievements/Achievements.jsx";
import Trade from './Trade/Trade.jsx';
import Market from './MarketWatch/Market.jsx';
import axios from 'axios';
import ResetModal from './Modal/ResetModal.jsx';

function App() {

  const [authenticatedUser, setAuthenticatedUser] = useState(1);
  const [activePage, setActivePage] = useState('Home');

  //Home Component States
  const [accountValue, setAccountValue] = useState(500);
  const [profits, setProfits] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [coins, setCoins] = useState([]);
  const [symbol, setSymbol] = useState('BTC');
  const [showResetModal, setShowResetModal] = useState(false);

  //Achievements Component States
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [achievementsStatus, setAchievementsStatus] = useState({});

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
      const userAchievements = await axios.get(`/users/${authenticatedUser}/achievements`);
      if (userAchievements.data?.length) {
        setUserAchievements(userAchievements.data);
      } else {
        await axios.post(`/users/${authenticatedUser}/achievements/1`);
        const retry = await axios.get(`/users/${authenticatedUser}/achievements`);
        if (retry.data?.length) {
          setUserAchievements(retry.data);
        }
      }
    } catch(err) {
      setUserAchievements([]);
    }
  };

  const grantUserAchievement = async (id) => {
    try {
      await axios.post(`/users/${authenticatedUser}/achievements/${id}`);
      getUserAchievements();
    } catch(err) {
      console.log(err);
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
    const status = {};
    if (userAchievements.length) {
      userAchievements.forEach((achievement) => {
      status[achievement.achievement_id] = true;
    })
  };
    setAchievementsStatus(status);
  }, [userAchievements]);

  useEffect(() => {
    getPortfolioData(authenticatedUser);
  }, [tradeHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCoins();
      getPortfolioData(authenticatedUser);
    }, 30000);
    return () => clearInterval(interval);
  }, []);


  function getPortfolioData(userId) {
    axios.get(`/users/${userId}/balances`)
      .then((data) => {
        setPortfolio(data.data);
        if (!achievementsStatus[3] && data.data.length >= 4) {
          grantUserAchievement(3);
        }
        return data.data;
      })
      .then((portfolioData) => {
        let accVal = portfolioData.reduce((acc, asset) => {
          return acc + asset.value;
        }, 0);
        setProfits((accVal - 500).toFixed(2));
        setAccountValue(accVal.toFixed(2));
        if (!achievementsStatus[9] && profits >= 50) {
          grantUserAchievement(9);
        }
        if (!achievementsStatus[10] && profits >= 100) {
          grantUserAchievement(10);
        }
        if (!achievementsStatus[11] && profits >= 500) {
          grantUserAchievement(11);
        }
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

  function handleCoinClick (e) {
    e.preventDefault();
    console.log(e.target.innerText); // the coin name
    setSymbol(e.target.innerText);
    setActivePage('Trade');
  }

  // Home:Balance component reset button
  function handleResetClick (e) {
    e.preventDefault();
    axios.delete(`/users/${authenticatedUser}/portfolio/`)
      .then((res) => {
        let updatedUserAchievements = res.data;
        setTradeHistory([]);
        setUserAchievements(updatedUserAchievements);
        setShowResetModal(false);
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
    activeComponent = (<Home setShowResetModal={setShowResetModal} accountValue={accountValue} handleResetClick={handleResetClick} profits={profits} portfolio={portfolio} tradeHistory={tradeHistory} userAchievements={userAchievements} />);
  } else if (activePage === 'Market Watch') {
    activeComponent = (<Market coins={coins} handleCoinClick={e => handleCoinClick(e)} activePage={activePage} symbol={symbol} />);
  } else if (activePage === 'Trade') {
    activeComponent = (<Trade authenticatedUser={authenticatedUser} portfolio={portfolio} symbol={symbol} />);
  } else if (activePage === 'Leader Board') {
    activeComponent = (<Leaderboard />);
  } else if (activePage === 'Achievements') {
    activeComponent = (<Achievements achievements={achievements} userAchievements={userAchievements} achievementsStatus={achievementsStatus} />);
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto min-h-screen text-neutral-100 bg-zinc-900 border-2 border-zinc-800">
      <Sidebar handleNavClick={handleNavClick} activePage={activePage} tradeHistory={tradeHistory} />
      <div className="w-full h-full">
        <div className="h-1/6 sticky top-0 z-20">
          <Header activePage={activePage} tradeHistory={tradeHistory} />
        </div>
        <div className="p-8 h-full bg-zinc-800">
          {activeComponent}
          <ResetModal showResetModal={showResetModal} setShowResetModal={setShowResetModal} handleResetClick={handleResetClick} />
        </div>
      </div>
    </div>
  )
}

export default App;
