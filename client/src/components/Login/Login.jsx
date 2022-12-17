import React, {useState} from 'react'
import babycoin from '../../../dist/assets/BabyCoin.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';

const Login = ({ updateUser }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordComparison, setPasswordComparison] = useState('')
  const [loginPage, setLoginPage] = useState(true);

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
    if(!username.length || !password.length) {
      return alert('Username and Password Fields must contain values');
    } else {
      axios.post('/auth/login', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        console.log('DATA FROM SERVER: ', data);
        updateUser(data.id);
      })
      .catch(err => console.log(err))
    }

  }

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.open('http://localhost:3000/auth/google', '_self')
    // axios
    //   .get('/auth/google')
    //   .then(result => {
    //     console.log(result.data)
    //   })
    //   .catch(err => {
    //     console.log('Google login failed')
    //     console.log(err)
    //   })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if(password !== passwordComparison) {
      return alert('Passwords must match');
    }
    if(!username.length || !password.length || !passwordComparison.length) {
      return alert('Username and Password Fields must contain values');
    } else {
      axios.post('/auth/signup', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        alert('Account Created')
        updateUser(data.id);
      })
      .catch(err => {
        alert('Something went wrong...')
        console.log(err)
      });
    }

  }

  const handleLoginPage = (e) => {
    e.preventDefault();
    setLoginPage(!loginPage);
  }

  return (
    <div className='relative w-full max-h-max'>
      <img className='absolute w-full h-full object-cover mix-blend-overlay min-h-screen' src={bgImage} alt="bgImage" />
      <div className='flex justify-center items-center py-8'>
        <img className= 'w-48 h-48' src={babycoin} alt='babycoin'/>
      </div>
      <div className='flex justify-center items-center py-8'>
        <form className='max-w-[400px] w-full mx-auto opacity-100 bg-white p-8 rounded-xl'>
          <h2 className='text-4xl font-bold text-center py-4'>BabyCoin</h2>
          <div className='flex justify-center py-8'>
            <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center rounded-xl' onClick={handleGoogleLogin}> <FcGoogle className='mr-2' />Google</button>
            {/* <a href="localhost:3000/auth/google">Click me</a> */}
          </div>

          {loginPage ? (
            <>
            <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input id='username' className='border relative bg-orange-100 p-2' type='text' onChange={handleInput}/>
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input id='password' className='border relative bg-orange-100 p-2' type='password' onChange={handleInput}/>
          </div>
          <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl' onClick={handleLogin}>Log In</button>

          <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl' onClick={handleLoginPage}>Not a Member? Sign Up Now!</button>
          {/* <button className='text-center mt-8' onClick={()=>setLoginPage(false)}>Not a Member? Sign Up Now!</button> */}
          </>
          ) : (
            <>
            <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input id='username' className='border relative bg-orange-100 p-2' type='text' onChange={handleInput}/>
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input id='password' className='border relative bg-orange-100 p-2' type='password' onChange={handleInput}/>
          </div>
          <div className='flex flex-col'>
            <label>Confirm Password</label>
            <input id='passwordcomparison' className='border relative bg-orange-100 p-2' type='password' onChange={handleInput}/>
          </div>
          <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl' onClick={handleSignUp}>Sign Up</button>
          <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl' onClick={handleLoginPage}>Already a Member? Log In Now!</button>
          {/* <p className='text-center mt-8' onClick={()=>setLoginPage(true)}>Already a Member? Log In Now!</p> */}
          </>
          )}






        </form>
      </div>
    </div>
  )
}

export default Login