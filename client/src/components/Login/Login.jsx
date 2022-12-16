import React, {useState} from 'react'
import babycoin from '../../../dist/assets/BabyCoin.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';

const Login = ({ updateUser }) => {

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
    axios.post('/auth/login', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        console.log('DATA FROM SERVER: ', data);
        updateUser(data);
      })
      .catch(err => console.log(err))
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    axios
      .get('/auth/google')
      .then(result => {
        console.log(result.data)
      })
      .catch(err => {
        console.log('Google login failed')
        console.log(err)
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if(password !== passwordComparison) {
      return alert('Passwords must match');
    }
    axios.post('/auth/signup', {
      username: username,
      password: password
    })
    .then(({ data }) => {
      alert('Account Created')
      updateUser(data);
    })
    .catch(err => {
      alert('Something went wrong...')
      console.log(err)
    });
  }

  return (
    <div className='relative w-full max-h-max'>
      <img className='absolute w-full h-full object-cover mix-blend-overlay' src={bgImage} alt="bgImage" />
      <div className='flex justify-center items-center py-8'>
        <img className= 'w-48 h-48' src={babycoin} alt='babycoin'/>
      </div>
      <div className='flex justify-center items-center py-8'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-4'>BabyCoin</h2>
          <div className='flex justify-center py-8'>
            {/* <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center' onClick={handleGoogleLogin}> <FcGoogle className='mr-2' />Google</button> */}
            <a href="localhost:3000/auth/google">Click me</a>
          </div>
          <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input id='username' className='border relative bg-gray-100 p-2' type='text' onChange={handleInput}/>
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input id='password' className='border relative bg-gray-100 p-2' type='password' onChange={handleInput}/>
          </div>
          <button className='w-full py-3 mt-8 bg-blue-600 hover:bg-blue-500 relative text-white' onClick={handleLogin}>Log In</button>
          <p className='text-center mt-8'>Not a Member? Sign Up Now!</p>
          <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input id='username' className='border relative bg-gray-100 p-2' type='text' onChange={handleInput}/>
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input id='password' className='border relative bg-gray-100 p-2' type='password' onChange={handleInput}/>
          </div>
          <div className='flex flex-col'>
            <label>Confirm Password</label>
            <input id='passwordcomparison' className='border relative bg-gray-100 p-2' type='password' onChange={handleInput}/>
          </div>
          <button className='w-full py-3 mt-8 bg-blue-600 hover:bg-blue-500 relative text-white' onClick={handleSignUp}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Login