import React, { useState } from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Home from './Profile/Home.jsx';

// YOU WILL CONDITIONALLY REPLACE THE PROFILE COMPONENT WITH TRADE, LEADER BOARD, ETC...

function App() {

  const [activePage, setActivePage] = useState('Home');

  function handleNavClick(e) {
    e.preventDefault();
    setActivePage(e.target.name);
  }

  let activeComponent;

  if (activePage === 'Home') {
    activeComponent = (<Home />);
  } else if (activePage === 'Market Watch') {
    activeComponent = (<h1>Insert Market Watch</h1>);
  } else if (activePage === 'Leader Board') {
    activeComponent = (<h1>Insert Leader Board</h1>);
  } else if (activePage === 'Achievements') {
    activeComponent = (<h1>Insert Achievements</h1>);
  };

  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto text-neutral-100 bg-zinc-900 border-2 border-zinc-800">
      <Sidebar handleNavClick={handleNavClick} activePage={activePage} />
      <div className="w-full h-full">
        <div className="h-1/6">
          <Header />
        </div>
        <div className="p-8 h-full bg-zinc-800">
          {activeComponent}
        </div>
      </div>
    </div>
  )
}

export default App;