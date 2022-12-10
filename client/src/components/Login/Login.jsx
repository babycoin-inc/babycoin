import React from 'react'
import babycoin from '../../../dist/assets/BabyCoin.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

const Login = () => {

  const handleLogin = () => {
    axios
      .post('auth/login')
      .then({ data } => {

      })
  }

  return (
    <div className='relative w-full h-screen'>
      <img className='absolute w-full h-full object-cover mix-blend-overlay' src={bgImage} alt="bgImage" />
      <div className='flex justify-center items-center py-8'>
        <img className= 'w-48 h-48' src={babycoin} alt='babycoin'/>
      </div>
      <div className='flex justify-center items-center py-8'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-4'>BabyCoin</h2>
          <div className='flex justify-center py-8'>
            <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'> <FcGoogle className='mr-2' />Google</button>
          </div>
          <div className='flex flex-col mb-4'>
            <label>Username</label>
            <input className='border relative bg-gray-100 p-2' type='text'/>
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input className='border relative bg-gray-100 p-2' type='text'/>
          </div>
          <button className='w-full py-3 mt-8 bg-blue-600 hover:bg-blue-500 relative text-white' onClick={handleLogin}>Log In</button>
          <p className='text-center mt-8'>Not a Member? Sign Up Now!</p>
        </form>
      </div>
    </div>
  )
}

export default Login