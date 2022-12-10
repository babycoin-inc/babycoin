import React, { useState } from 'react';
import App from './App.jsx';
import Login from './Login/Login.jsx';

const Page = () => {
  const [authorizedUser, setAuthorizedUser] = useState(null);

  // return (
  //   {authorizedUser ? <App /> : <Login updateUser={setAuthorizedUser}/>}
  // )

  if(!authorizedUser) {
    return <Login updateUser={setAuthorizedUser}/>
  } else {
    return <App />
  }
}

export default Page;