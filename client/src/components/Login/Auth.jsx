import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import babycoin from '../../../dist/assets/BabyCoin.png'
import bgImage from '../../../dist/assets/trading-bg.jpg'
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import GoogleButton from './GoogleButton.jsx';
const BACKGROUND_URL = "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80";



const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleWhichForm = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
  }

  return (
    <div className='relative w-full min-h-screen bg-[url("https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80")] bg-cover'>
      <div className='flex justify-center items-center py-8'>
        <img className= 'w-48 h-48' src={babycoin} alt='babycoin'/>
      </div>
      <div className='max-w-[400px] w-full mx-auto p-8 bg-zinc-200 rounded-xl'>
        <h2 className='text-4xl font-bold text-center py-4'>BabyCoin</h2>
          <GoogleButton />
          {isLoginForm ? <LoginForm switchForm={setIsLoginForm} /> : <SignupForm switchForm={setIsLoginForm} />}
        <button
          className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl italic'
          onClick={handleWhichForm}>
            {isLoginForm ? 'Not a Member? Sign Up Now!' : 'Already a Member? Login Now!'}
        </button>
      </div>
    </div>
  )
}

export default Auth