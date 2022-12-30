import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import babycoinLogo from '../../../dist/assets/BabyCoinHalfLogo.png';
import babycoinblink from '../../../dist/assets/BabyCoinHalfLogoBlink.png';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import GoogleButton from './GoogleButton.jsx';

const Auth = ({ updateUser }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [blinking, setBlinking] = useState(false);

  const handleWhichForm = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
  }

  return (
    <div className={`relative w-full min-h-screen`}>
      <div className='flex flex-col justify-center items-center pt-28'>
        <div onMouseEnter={(() => setBlinking(true))} onMouseLeave={() => setBlinking(false)}>
          {!blinking && <img className= 'w-48 h-48' src={babycoinLogo} alt='babycoin'/>}
          {blinking && <img className= 'w-48 h-48' src={babycoinblink} alt='babycoin'/>}
        </div>
      </div>
      {/* <div className='max-w-[400px] w-full mx-auto p-20 bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 rounded-xl -mt-14 text-zinc-200'> */}
      <div className='max-w-[400px] w-full mx-auto p-20 bg-metallic rounded-xl -mt-14 text-zinc-200'>
        <h2 className='text-6xl font-bold text-center py-4 italic text-zinc-200'>babycoin</h2>
        <div className='text-center hover:scale-105'>
          <small>{isLoginForm ? 'Not' : 'Already'} a member? <a className='text-orange-700 hover:text-orange-500 cursor-pointer' onClick={handleWhichForm}>{isLoginForm ? 'Sign Up Now!' : 'Login Now!'}</a></small>
        </div>
        <GoogleButton />
        {isLoginForm ? <LoginForm updateUser={updateUser} /> : <SignupForm updateUser={updateUser}/>}
      </div>
    </div>
  )
}

export default Auth