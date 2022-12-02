import React from "react";
import '../../dist/styles/styles.css'
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header.jsx';
import Profile from './Profile/Profile.jsx';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Header />
        <Profile />
      </div>
    </div>
  )
}

export default App;