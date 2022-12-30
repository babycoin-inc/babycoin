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

function App({ authenticatedUser, setAuthorizedUser }) {

  //const [authenticatedUser, setAuthenticatedUser] = useState(1);
  const [activePage, setActivePage] = useState('Home');

  //Home Component States
  const [accountValue, setAccountValue] = useState(500);
  const [profits, setProfits] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [coins, setCoins] = useState([]);
  const [symbol, setSymbol] = useState('BTC');
  const [showResetModal, setShowResetModal] = useState(false);

  // watchlist:
  const watched_coins = JSON.parse(window.localStorage.getItem(`Watched_Coins for the user ${authenticatedUser}:`)) || [];
  const [multiValue, setMultiValue] = useState([]);
  const sendObj = {addedList: multiValue};
  const [userWatchlist, setUserWatchlist] = useState(watched_coins);


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
    watched_coins ? setUserWatchlist(watched_coins) : null;
  }, []);

  useEffect(() => {
    const status = {};
    console.log(userAchievements, userAchievements.length)
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

  useEffect(() => {
    sendObj.addedList = multiValue;
  }, [multiValue]);

  useEffect(() => {
    window.localStorage.setItem(`Watched_Coins for the user ${authenticatedUser}:`, JSON.stringify(userWatchlist));
  }, [userWatchlist]);

  async function getPortfolioData(userId) {
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

  // get the info of all coins
  function getCoins() {
    axios.get(`/coins/markets`)
    .then((coins) => {
      setCoins(coins.data);
    })
    .catch(err => console.log(err));
  }

  async function handleCoinClick (e) {
    e.preventDefault();
    try {
      await coins.map(coin => (coin.name === e.target.innerText || coin.acronym.toLowerCase() === e.target.innerText.toLowerCase() ? setSymbol(coin.acronym) : null));
    } catch (err) {
      console.log('ERR: forwarding to the trading page', err);
    }
    setActivePage('Trade');
  }

  // dropdown & watchlist
  function handleMultiChange (selectedOption) {
    setMultiValue(selectedOption);
  }

  function addToWatchlist () {
    axios.post(`/users/${authenticatedUser}/watchlist`, sendObj)
    .then(result => {
      setUserWatchlist(result.data);
    })
    .catch(err => console.log(err));
  }

  function deleteCoin (coin) {
    axios.delete(`/users/${authenticatedUser}/watchlist/${coin}`)
    .then(result => {
      setUserWatchlist(result.data);
    })
    .catch(err => console.log(err));
  }

  function removeFromWatchlist (e) {
    e.preventDefault();
    deleteCoin(e.target.parentNode.childNodes[1].innerText);
  }

  function toggleStars (e) {
    const coin = e.target.parentNode.childNodes[1].childNodes[1].childNodes[0].innerText;
    sendObj['addedList'] = [{value: coin, label: coin}];
    e.target.innerText === '★' ? deleteCoin(coin) : addToWatchlist();
  }


  // Home:Balance component reset button
  function handleResetClick (e) {
    e.preventDefault();
    axios.delete(`/users/${authenticatedUser}/portfolio/`)
      .then((res) => {
        let updatedUserAchievements = res.data;
        axios.delete(`/users/${authenticatedUser}/watchlist`)
        .then(() => {
          setTradeHistory([]);
          setUserAchievements(updatedUserAchievements);
          setShowResetModal(false);
          setUserWatchlist([]);
        })
        .catch(err => console.log(err));
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
    activeComponent = (<Market coins={coins} handleCoinClick={e => handleCoinClick(e)} activePage={activePage} symbol={symbol} userWatchlist={userWatchlist} toggleStars={e=>toggleStars(e)} />);
  } else if (activePage === 'Trade') {
    activeComponent = (<Trade authenticatedUser={authenticatedUser} coins={coins} portfolio={portfolio} getPortfolioData={getPortfolioData} symbol={symbol} achievementsStatus={achievementsStatus} grantUserAchievement={grantUserAchievement} setActivePage={setActivePage} getTradeHistory={getTradeHistory} />);

  } else if (activePage === 'Leader Board') {
    activeComponent = (<Leaderboard />);
  } else if (activePage === 'Achievements') {
    activeComponent = (<Achievements achievements={achievements} userAchievements={userAchievements} achievementsStatus={achievementsStatus} />);
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl min-w-1000 mx-auto min-h-screen text-neutral-100 bg-zinc-900 border-4 border-zinc-900">
      <Sidebar handleNavClick={handleNavClick} activePage={activePage} tradeHistory={tradeHistory} userWatchlist={userWatchlist} coins={coins} removeFromWatchlist={e => removeFromWatchlist(e)} />
      <div className="w-full h-full">
        <div className="h-1/6 sticky top-0 z-20">
          <Header activePage={activePage} setAuthorizedUser={setAuthorizedUser} tradeHistory={tradeHistory} addToWatchlist={addToWatchlist} handleMultiChange={e => handleMultiChange(e)} userWatchlist={userWatchlist} coins={coins} handleCoinClick={e => handleCoinClick(e)}/>
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
