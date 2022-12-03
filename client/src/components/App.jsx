import React from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header/Header.jsx';
import Profile from './Profile/Profile.jsx';

// YOU WILL CONDITIONALLY REPLACE THE PROFILE COMPONENT WITH TRADE, LEADER BOARD, ETC...

function App() {
  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto text-neutral-100 bg-neutral-900 border-2 border-zinc-700">
      <Sidebar />
      <div className="w-full h-full">
        <div className="h-1/6">
          <Header />
        </div>
        <div className="p-8 h-full bg-neutral-800">
          <Profile />
        </div>
      </div>
    </div>
  )
}

export default App;