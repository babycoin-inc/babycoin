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
  const [infoIsShown, setInfoIsShown] = useState(false);

  const handleWhichForm = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
  }

  const toggleInfo = () => {
    setInfoIsShown(!infoIsShown);
  }

  return (
    <div className={`relative w-full min-h-screen`}>
      <div className='flex flex-col justify-center items-center pt-28'>
        <div id='logoContainer' onMouseEnter={(() => setBlinking(true))} onMouseLeave={() => setBlinking(false)}>
          {!blinking && <img className= 'w-48 h-48' src={babycoinLogo} alt='babycoin'/>}
          {blinking && <img className= 'w-48 h-48' src={babycoinblink} alt='babycoin'/>}
        </div>
      </div>
      <div className='max-w-[400px] w-full mx-auto bg-bitcoin-pattern rounded-xl -mt-14 text-zinc-200 border-4 border-zinc-800'>
        {infoIsShown ?
          <div id='infoContainer' className='px-9 py-[79px]'> {/* 79px keeps box from changing height between switching 'cards'*/}
           Babycoin is a cryptocurrency trading platform designed for aspiring traders who want to learn the ins and outs of trading without risking real money. The platform allows users to trade with practice currency in a sandbox environment, giving them the opportunity to try out different strategies and techniques without the pressure of actual financial risk. Babycoin also offers a range of achievements and lessons designed to teach basic trading skills and help users become more confident and knowledgeable traders. Whether you are just starting out in the world of cryptocurrency trading or are looking to improve your skills, Babycoin is a great resource for learning and practicing your trades.
          </div>
        :
          <div id='loginSignupContainer' className='p-20'>
            <h2 className='text-6xl font-bold text-center py-4 italic text-zinc-200'>babycoin</h2>
            <div className='text-center hover:scale-105'>
              <small>{isLoginForm ? 'Not' : 'Already'} a member? <a className='text-orange-700 hover:text-orange-500 cursor-pointer' onClick={handleWhichForm}>{isLoginForm ? 'Sign Up Now!' : 'Login Now!'}</a></small>
            </div>
            <GoogleButton />
            {isLoginForm ? <LoginForm updateUser={updateUser} /> : <SignupForm updateUser={updateUser}/>}
          </div>
        }

      </div>
      <div id='info' className='mt-6 text-center text-zinc-200'>
        <button onClick={toggleInfo}>
          {infoIsShown ? <em>back to login..</em> : <em>..what is babycoin?</em> }
        </button>
      </div>
    </div>
  )
}

export default Auth