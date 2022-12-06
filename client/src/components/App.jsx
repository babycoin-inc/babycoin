import React, { useState } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import Achievements from "./Achievements/Achievements.jsx";



function App() {

  const [activePage, setActivePage] = useState('Achievements');

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
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto text-neutral-100 bg-zinc-900 border-2 border-zinc-800">
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