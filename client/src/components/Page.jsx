import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import Login from './Login/Login.jsx';

const Page = () => {
  const [authorizedUser, setAuthorizedUser] = useState(JSON.parse(window.sessionStorage.getItem('userID')));
  const [sessionCookie, setSessionCookie] = useState(JSON.parse(window.sessionStorage.getItem('session')));
  // return (
  //   {authorizedUser ? <App /> : <Login updateUser={setAuthorizedUser}/>}
  // )

  // useEffect(() => {
  //   setAuthorizedUser(JSON.parse(window.localStorage.getItem('userID')));
  // }, []);

  useEffect(() => {
    window.sessionStorage.setItem('userID', JSON.stringify(authorizedUser));
  }, [authorizedUser]);

  if(!authorizedUser) {
    return <Login updateUser={setAuthorizedUser} updateSession={setSessionCookie}/>
  } else {
    return <App className = "bg-zinc-900 pb-8"/>
  }
}

export default Page;