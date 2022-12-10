import React, { useState } from 'react';
import App from './App.jsx';
import Login from './Login/Login.jsx';



const Page = () => {
  const [authorizedUser, setAuthorizedUser] = useState(false);

  if(authorizedUser === null) {
    return <div>Loading...</div>
  }
  if(authorizedUser) {
    return <App />
  }
  return <Login />
}

export default Page;