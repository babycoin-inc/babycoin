import React, { useState } from 'react';
import App from './App.jsx';
import Login from './Login/Login.jsx';

const Page = () => {
  const [authorizedUser, setAuthorizedUser] = useState(null);

  // return (
  //   {authorizedUser ? <App /> : <Login updateUser={setAuthorizedUser}/>}
  // )

  // if(!authorizedUser) {
  //   return <Login updateUser={setAuthorizedUser}/>
  // } else {
    return <App className = "bg-zinc-900 pb-8"/>
  // }
}

export default Page;