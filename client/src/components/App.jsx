import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Leaderboard from "./Leaderboard/Leaderboard.jsx";
import Achievements from "./Achievements/Achievements.jsx";
import Notification from "./Achievements/Notification.jsx";
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
  const [coin, setCoinT] = useState({});

  // watchlist & marketWatch & dropdown:
  const watched_coins = JSON.parse(window.localStorage.getItem(`Watched_Coins for the user ${authenticatedUser}:`)) || [];
  const [multiValue, setMultiValue] = useState([]);
  const sendObj = {addedList: multiValue};
  const [userWatchlist, setUserWatchlist] = useState(watched_coins);

  //Achievements Component States
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [achievementsStatus, setAchievementsStatus] = useState({});
  const [achievementNotif, setAchievementNotif] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState({});

  const getAchievements = async () => {
    try {
      const achievements = await axios.get(`/achievements`);
      setAchievements(achievements.data);
    } catch (err) {
      console.log(err);
      setAchievements([]);
    }
  };

  const getUserAchievements = async () => {
    try {
      const userAchievements = await axios.get(`/users/${authenticatedUser}/achievements`);
      if (userAchievements.data?.length) {
        setUserAchievements(userAchievements.data);
        return userAchievements.data;
      } else {
        await axios.post(`/users/${authenticatedUser}/achievements/1`);
        const retry = await axios.get(`/users/${authenticatedUser}/achievements`);
        if (retry.data?.length) {
          setUserAchievements(retry.data);
          console.log(achievements);
          showAchievementNotif(1);
        }
      }
    } catch(err) {
      setUserAchievements([]);
    }
  };

  const grantUserAchievement = async (id) => {
    try {
      let curCount = userAchievements.length;
      if (id === 12) {
        let check = false;
        const { data } = await axios.get(`/leaderboard`);
        for (let i = 0; i < data[1].length; i++) {
          if (data[1][i].id === authenticatedUser) {
            check = true;
            break;
          }
        }
        if (!check) return;
      }
      axios.post(`/users/${authenticatedUser}/achievements/${id}`)
      .then(() => getUserAchievements())
      .then((data) => {
          if (data.length !== curCount) {
            showAchievementNotif(id);
          }
        });
      } catch(err) {
      console.log(err);
    }
  };

  const showAchievementNotif = (id) => {
    if (!achievementNotif) {
      for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].id === id) {
          const latest = achievements[i];
          setLatestAchievement(latest);
          setAchievementNotif(true);
          setTimeout(() => {
            setAchievementNotif(false);
          }, 9000);
          break;
        }
      }
    }
  }

  //App On-Mount Effects
  useEffect(() => {
    getPortfolioData(authenticatedUser);
    getTradeHistory(authenticatedUser);
    getAchievements();
    getCoins();
    watched_coins ? setUserWatchlist(watched_coins) : null;
  }, []);

  useEffect(() => {
    if (achievements.length) {
      getUserAchievements();
    }
  }, [achievements]);

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
    if (!achievementsStatus[9] && accountValue >= 550) {
      grantUserAchievement(9);
    }
    if (!achievementsStatus[10] && profits >= 650) {
      grantUserAchievement(10);
    }
    if (!achievementsStatus[11] && profits >= 1000) {
      grantUserAchievement(11);
    }
  }, [accountValue]);

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

  // get the info of all coins
  function getCoins() {
    axios.get(`/coins/markets`)
    .then((coins) => {
      setCoins(coins.data);
      return coins.data;
    })
    .catch(err => console.log(err));
  }

  async function handleCoinClick (e) {
    e.preventDefault();
    try {
      await coins.map(coin => (coin.name === e.target.innerText || coin.acronym.toLowerCase() === e.target.innerText.toLowerCase() ? (setSymbol(coin.acronym), setCoinT(coin)) : null));
    } catch (err) {
      console.log('ERR: forwarding to the trading page', err);
    }
    setActivePage('Trade');
  }

  // dropdown & watchlist & marketWatch
  async function handleCoinSelect (selectedOption) {
    setMultiValue([selectedOption]);
    try {
      await coins.map(coin => coin.name === selectedOption['value'] ? (setSymbol(coin.acronym), setCoinT(coin)) : null);
    } catch (err) {
      console.log('ERR: setSymbol error', err);
    }
    setActivePage('Trade');
  }

  function addToWatchlist () {
    axios.post(`/users/${authenticatedUser}/watchlist`, sendObj)
    .then(result => {
      setUserWatchlist(result.data);
      if (!achievementsStatus[7]) {
        grantUserAchievement(7);
      }
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
    const coin = e.target.parentNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerText;
    sendObj['addedList'] = [{value: coin, label: coin}];
    e.target.innerText === '★' ? deleteCoin(coin) : addToWatchlist();
  }

  function goToMarketwatch (e) {
    setActivePage('Market Watch');
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
    activeComponent = (<Market coins={coins} handleCoinClick={e => handleCoinClick(e)} activePage={activePage} symbol={symbol} userWatchlist={userWatchlist} toggleStars={e=>toggleStars(e)} authenticatedUser={authenticatedUser} />);
  } else if (activePage === 'Trade') {
    activeComponent = (<Trade authenticatedUser={authenticatedUser} coins={coins} portfolio={portfolio} getPortfolioData={getPortfolioData} symbol={symbol} setSymbol={setSymbol} achievementsStatus={achievementsStatus} grantUserAchievement={grantUserAchievement} setActivePage={setActivePage} getTradeHistory={getTradeHistory} coin={coin} setCoinT={setCoinT}/>);

  } else if (activePage === 'Leader Board') {
    activeComponent = (<Leaderboard />);
  } else if (activePage === 'Achievements') {
    activeComponent = (<Achievements achievements={achievements} userAchievements={userAchievements} achievementsStatus={achievementsStatus} />);
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto min-h-screen text-neutral-100 bg-zinc-900 border-2 border-zinc-800">
      <Sidebar profits={profits} handleNavClick={handleNavClick} activePage={activePage} setActivePage={setActivePage} tradeHistory={tradeHistory} userWatchlist={userWatchlist} coins={coins} removeFromWatchlist={e => removeFromWatchlist(e)} authenticatedUser={authenticatedUser} handleCoinClick={e => handleCoinClick(e)} goToMarketwatch={e => goToMarketwatch(e)} />
      <div className="w-full h-full">
        <div className="h-1/6 sticky top-0 z-20">
          <Header activePage={activePage} setAuthorizedUser={setAuthorizedUser} tradeHistory={tradeHistory} addToWatchlist={addToWatchlist} handleCoinSelect={selectedOption => handleCoinSelect(selectedOption)} userWatchlist={userWatchlist} coins={coins} handleCoinClick={e => handleCoinClick(e)}/>
        </div>
        <div className="p-8 h-full bg-zinc-800">
          {activeComponent}
          <ResetModal showResetModal={showResetModal} setShowResetModal={setShowResetModal} handleResetClick={handleResetClick} />
        </div>
          <Notification isVisible={achievementNotif} setIsVisible={setAchievementNotif} achievement={latestAchievement}/>
      </div>
    </div>
  )
}

export default App;
