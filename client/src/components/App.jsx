import React, { useState } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Achievements from "./Achievements/Achievements.jsx";
import Graph from "./Trading/Graph.jsx";
import axios from 'axios';


function App() {

  const [activePage, setActivePage] = useState('Home');
  const [coinDropdown, setCoinDropDown] = useState();
  const [symbol, setSymbol] = useState();

  const handleChangeDropdown = (event) => {
    setCoinDropDown(event.target.value);
    // let coinName = event.target.value;
    getSymbolName(event.target.value);
    setActivePage('Graph');
  }

  const getSymbolName = (coinName) => {
    axios.get(`https://api.coingecko.com/api/v3/search?query=${coinName}`)
    .then(response => {
      // console.log('DATA FROM API: ', response.data.coins[0].symbol);
      setSymbol(response.data.coins[0].symbol);
    })
  }

  function handleNavClick(e) {
    e.preventDefault();
    setActivePage(e.target.name);
  }

  let activeComponent;

  // INSERT YOUR COMPONENTS BASED OFF THE ACTIVE PAGE BELOW
  if (activePage === 'Home') {
    activeComponent = (<Home />);
  } else if (activePage === 'Market Watch') {
    activeComponent = (<h1>Insert Market Watch</h1>);
  } else if (activePage === 'Leader Board') {
    activeComponent = (<h1>Insert Leader Board</h1>);
  } else if (activePage === 'Achievements') {
    activeComponent = (<Achievements />);
  } else if (activePage === 'Graph') {
    activeComponent = (<Graph symbol={symbol}/>);
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto min-h-screen text-neutral-100 bg-zinc-900 border-2 border-zinc-800">
      <Sidebar handleNavClick={handleNavClick} activePage={activePage} />
      <div className="w-full h-full">
        <div className="h-1/6">
          <Header activePage={activePage} handleChangeDropdown={handleChangeDropdown}/>
        </div>
        <div className="p-8 h-full bg-zinc-800">
          {activeComponent}
        </div>
      </div>
    </div>
  )
}

export default App;