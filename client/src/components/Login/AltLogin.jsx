import React, {useState} from 'react'
import babycoin from '../../../dist/assets/BabyCoin.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';

function AltLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordComparison, setPasswordComparison] = useState('')

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


  return (
    <div className="h-screen min-w-full max-w-screen-2xl mx-auto bg-[url('https://www.kraken.com/accounts/_next/static/media/pro.d68a5101.svg')] bg-cover bg-right-bottom text-white pt-6">
      <div className="relative flex justify-between w-4/5 mx-auto z-10">
        <img src={babycoin} className="h-16" />
        <button>Sign In</button>
      </div>
      <div className="relative text-zinc-900 z-10 top-20 left-48 w-2/5">
        <h1 className="tracking-widest text-5xl text-center">Create Your Account</h1>
        <button className='border rounded-xl px-6 py-2 mt-16 flex items-center mx-auto'> <FcGoogle className='mr-2' />Sign In With Google</button>
        <h2 className="text-center before:content-dash before:mr-2 after:content-dash after:ml-2 mt-6">Or</h2>
          <form className="mt-2 flex flex-col gap-12">
            <div className="relative">
              <input id="username" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type='text' placeholder=" " onChange={handleInput}/>
              <label for="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>
            <div className="relative">
              <input id="password" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type='password' placeholder=" " onChange={handleInput}/>
              <label for="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="relative">
              <input id="passwordcomparison" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type='password' placeholder=" " onChange={handleInput}/>
              <label for="passwordcomparison" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
            </div>
            <button className='rounded-xl p-3 mt-8 bg-blue-600 hover:bg-blue-500 text-white w-fit self-end' onClick={handleSignUp}>Create Account</button>
          </form>
      </div>
      <div className="fixed w-3/5 h-full bg-white top-0 left-20">
        <div className="absolute h-full w-full bg-white skew-x-3 -left-6"></div>
        <div className="absolute h-full w-1/2 bg-white -skew-x-12 top-0 right-0"></div>
        <div className="absolute h-full w-1/2 bg-white/50 skew-x-12 bottom-0 -right-4"></div>
        <div className="absolute h-full w-1/4 bg-white/70 skew-x-6 bottom-0 right-2"></div>
      </div>
    </div>
  )
}

export default AltLogin;


<div class="relative z-0">
    <input type="text" id="floating_standard" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

    <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Floating standard</label>
</div>