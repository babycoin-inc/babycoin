import React from "react";
import '../../dist/styles/styles.css'
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header.jsx';
import Profile from './Profile/Profile.jsx';

function App() {
  return (
    <div className="flex m-0 p-0 max-w-screen-xl border-2 border-red-700 w-full">
      <Sidebar />
      <div>
        <Header />
        <Profile />
      </div>
    </div>
  )
}

export default App;