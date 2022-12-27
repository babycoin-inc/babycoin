import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import Login from './Login/Login.jsx';
import axios from 'axios';

const Page = () => {
  const [authorizedUser, setAuthorizedUser] = useState('');
  // const [authorizedUser, setAuthorizedUser] = useState(JSON.parse(window.sessionStorage.getItem('userID')));
  // const [sessionCookie, setSessionCookie] = useState(JSON.parse(window.sessionStorage.getItem('session')));

  // return (
  //   {authorizedUser ? <App /> : <Login updateUser={setAuthorizedUser}/>}
  // )

  // useEffect(() => {
  //   setAuthorizedUser(JSON.parse(window.localStorage.getItem('userID')));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get('/getuser', { withCredentials: true })
  //     .then(result => {
  //       if (result.data) setAuthorizedUser(result.data);
  //       console.log('RESULT DATA FROM GETUSER CALL', result.data);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  // useEffect(() => {
  //   window.sessionStorage.setItem('userID', JSON.stringify(authorizedUser));
  // }, [authorizedUser]);


  if(!authorizedUser) {
    return <Login updateUser={setAuthorizedUser} />
  } else {
    return <App className = "bg-zinc-900 pb-8" authorizedUser={authorizedUser} setAuthorizedUser={setAuthorizedUser}/>
  }

  // if(!authorizedUser) {
  //   return <Login updateUser={setAuthorizedUser} updateSession={setSessionCookie}/>
  // } else {
  //   return <App className = "bg-zinc-900 pb-8" setAuthorizedUser={setAuthorizedUser}/>
  // }
}

export default Page;