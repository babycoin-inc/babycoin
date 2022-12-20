import React, {useState, useEffect} from 'react'
import babycoin from '../../../dist/assets/BabyCoin.png'
import BabyCoinDarkPurple from '../../../dist/assets/BabyCoinDarkPurple.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';

function AltLogin() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordComparison, setPasswordComparison] = useState('')

  const handlePageSwitch = (e) => {
    e.preventDefault();
    setIsLoginPage(isLoginPage => !isLoginPage);
  }

  const handleInput = (e) => {
    e.preventDefault();
    if(e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    } else {
      setPasswordComparison(e.target.value);
    }
    console.log('USERNAME: ', username);
    console.log('PASSWORD: ', password);
    console.log('CONFIRM PASSWORD: ', passwordComparison)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        console.log('DATA FROM SERVER: ', data);
        updateUser(data);
      })
      .catch(err => console.log(err))
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if(password !== passwordComparison) {
      return alert('Passwords must match');
    }
    axios.post('/signup', {
      username: username,
      password: password
    })
    .then(result => alert('Account Created'))
    .catch(err => {
      alert('Something went wrong...')
      console.log(err)}
      );
  }

  useEffect(() => {
    setUsername('');
    setPassword('');
    setPasswordComparison('');
  }, [isLoginPage])

  let navButtonText = isLoginPage ? 'Create Account' : 'Sign In';
  let formText = isLoginPage ? 'Sign In To BabyCoin' : 'Create Your Account';
  let submitButtonText = isLoginPage ? 'Login' : 'Create Account';
  let submitButtonHandler = isLoginPage ? handleLogin : handleSignUp;

  return (
    <div className="h-screen min-w-full max-w-screen-2xl mx-auto bg-[url('https://lh6.googleusercontent.com/9gTOCTNM_w3o_DF5FLEt5CIcJww09ikvfuI2zDuzQwf9nsi6Inov1D1Nnlz-uLbhX6Y=w1200-h630-p')] bg-cover bg-right-top text-white pt-6">
      <div className="relative flex justify-between w-4/5 mx-auto z-10 items-center">
        <img src={BabyCoinDarkPurple} className="h-28" />
        <button onClick={handlePageSwitch} className="rounded-3xl h-fit border-2 py-2 px-4 hover:bg-zinc-800">{navButtonText}</button>
      </div>
      <div className="relative text-zinc-900 z-10 top-20 left-48 w-1/3">
        <h1 className="tracking-widest text-4xl text-center">{formText}</h1>
        <button className='border border-zinc-400 rounded-xl px-6 py-2 mt-20 flex items-center mx-auto'> <FcGoogle className='mr-2' />Sign In With Google</button>
        <h2 className="text-center before:content-dash before:mr-2 after:content-dash after:ml-2 mt-10">Or</h2>
          <form className="mt-6 flex flex-col gap-12 w-11/12 mx-auto">
            <div className="relative">
              <input id="username" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer' type='text' placeholder=" " onChange={handleInput} value={username} />
              <label for="username" className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>
            <div className="relative">
              <input id="password" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer' type='password' placeholder=" " onChange={handleInput} value={password} />
              <label for="password" className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            {!isLoginPage && <div className="relative">
              <input id="passwordcomparison" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer' type='password' placeholder=" " onChange={handleInput} value={passwordComparison} />
              <label for="passwordcomparison" className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
            </div>}
            <button className='rounded-3xl py-3 px-8 mt-8 bg-zinc-800 hover:bg-zinc-700 text-white w-fit self-end' onClick={submitButtonHandler}>{submitButtonText}</button>
          </form>
      </div>
      <div className="fixed w-2/5 h-full top-0 left-44 min-w-max">
        <div className="absolute h-full w-1/2 bg-zinc-200/30 skew-x-6 bottom-0 -right-16"></div>
        <div className="absolute h-full w-1/4 bg-zinc-200/50 skew-x-6 bottom-0 -right-2"></div>
        <div className="absolute h-full w-1/2 bg-zinc-100 -skew-x-12 top-0 right-28"></div>
        <div className="absolute h-full w-full bg-zinc-100 skew-x-6 -left-14 overflow-hidden"></div>
      </div>
    </div>
  )
}

export default AltLogin;