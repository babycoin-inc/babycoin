import React from "react";
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header.jsx';
import Profile from './Profile/Profile.jsx';

// YOU WILL CONDITIONALLY REPLACE THE PROFILE COMPONENT WITH TRADE, LEADER BOARD, ETC...

function App() {
  return (
    <div className="flex m-0 p-0 max-w-screen-xl mx-auto border-2 border-red-700 w-full h-full">
      <Sidebar />
      <div className="w-full">
        <div className="h-1/6">
          <Header />
        </div>
        <div className="p-8">
          <Profile />
        </div>
      </div>
    </div>
  )
}

export default App;