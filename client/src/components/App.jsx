import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Achievements from "./Achievements/Achievements.jsx";
import Trade from './Trade/Trade.jsx';

function App() {

  const [authenticatedUser, setAuthenticatedUser] = useState(1);
  const [activePage, setActivePage] = useState('Home');

  //Home Component States
  const [accountValue, setAccountValue] = useState(500);
  const [profits, setProfits] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);


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
        setAccountValue(accVal.toFixed(2));
        setProfits((accVal - 500).toFixed(2));
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

  useEffect(() => {
    getPortfolioData(authenticatedUser);
    getTradeHistory(authenticatedUser);
  }, []);

  // useEffect(() => {
  //   getPortfolioData(authenticatedUser);
  // }, [tradeHistory]);


  // Home-Balance component reset button
  function handleResetClick (e) {
    e.preventDefault();
    // clear portfolio

    // Insert $500 usd into portfolio

    // clearing transaction history
    axios.delete(`/users/${authenticatedUser}/transactions/`)
      .then((res) => {
        console.log('res', res);
        setAccountValue(500);
        setProfits(0);
        res.send(res);
      });
  };

  function handleNavClick(e) {
    e.preventDefault();
    setActivePage(e.target.name);
  }

  let activeComponent;

  // INSERT YOUR COMPONENTS BASED OFF THE ACTIVE PAGE BELOW
  if (activePage === 'Home') {
    activeComponent = (<Home accountValue={accountValue} handleResetClick={handleResetClick} profits={profits} portfolio={portfolio} tradeHistory={tradeHistory} />);
  } else if (activePage === 'Market Watch') {
    activeComponent = (<h1>Insert Market Watch</h1>);
  } else if (activePage === 'Trade') {
    activeComponent = (<Trade authenticatedUser={authenticatedUser} portfolio={portfolio} />);
  } else if (activePage === 'Leader Board') {
    activeComponent = (<h1>Insert Leader Board</h1>);
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