import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import babycoin from '../../../dist/assets/BabyCoin.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import LoginForm from './LoginForm.jsx'
const BACKGROUND_URL = "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80";



const Auth = () => {

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.open('http://localhost:3000/auth/google', '_self')
  }

  return (
    <div className='relative w-full min-h-screen bg-[url("https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80")] bg-cover'>
      <div className='flex justify-center items-center py-8'>
        <img className= 'w-48 h-48' src={babycoin} alt='babycoin'/>
      </div>
      {/* <div className='flex justify-center items-center py-8'> */}
      <div className='max-w-[400px] w-full mx-auto p-8 bg-zinc-200 rounded-xl'>
        <h2 className='text-4xl font-bold text-center py-4'>BabyCoin</h2>
          <div className='flex justify-center py-8'>
            <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center rounded-xl' onClick={handleGoogleLogin}> <FcGoogle className='mr-2' />Google</button>
          </div>
          {/* <div className='max-w-[400px] w-full mx-auto p-8 bg-zinc-200 rounded-xl'> */}
            <LoginForm />
          {/* </div> */}
      </div>
    </div>
  )
}

export default Auth