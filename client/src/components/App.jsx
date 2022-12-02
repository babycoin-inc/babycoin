import React from "react";
// import '../styles/tailwind.css'
import Sidebar from './Sidebar/Sidebar.jsx';
import Header from './Header.jsx';
import Profile from './Profile/Profile.jsx';

function App() {
  return (
    <>
      <Sidebar />
      <div className="bg-white">
        <Header />
        <Profile />
      </div>
    </>
  )
}

export default App;