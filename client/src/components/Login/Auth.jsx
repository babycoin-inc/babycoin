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

  const

  return (
    <div className={`relative w-full min-h-screen`}>
      {/* Logo container */}
      <div className='flex flex-col justify-center items-center pt-28'>
        <div id='logoContainer' onMouseEnter={(() => setBlinking(true))} onMouseLeave={() => setBlinking(false)}>
          {!blinking && <img className= 'w-48 h-48' src={babycoinLogo} alt='babycoin'/>}
          {blinking && <img className= 'w-48 h-48' src={babycoinblink} alt='babycoin'/>}
        </div>
      </div>

      {/* Border */}
      <div className='bg-zinc-800 border-2 border-zinc-600 max-w-[450px] w-full -mt-14 mx-auto rounded-xl pb-10'> {/** h-[680px]*/}

        {/* solid background card */}
        <div className='group'>
        <div className='border-2 border-zinc-900 max-w-[375px] bg-bitcoin-pattern rounded-xl mx-[37.5px] mt-10 text-zinc-200 transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'> {/* -mt-14 */}

          {/* INFO BOX */}
          {infoIsShown ?
            <div id='infoContainer' className='bg-bitcoin-pattern [transform:rotateY(180deg)] [backface-visibility:hidden]' > {/* className='px-9 py-[79px]' 79px keeps box from changing height between switching 'cards'*/}
              <div className='px-8 py-[71px] text-center'>
                Babycoin is a cryptocurrency trading platform designed for aspiring traders who want to learn the ins and outs of trading without risking real money. The platform allows users to trade with practice currency in a sandbox environment, giving them the opportunity to try out different strategies and techniques without the pressure of actual financial risk. Babycoin also offers a range of achievements and lessons designed to teach basic trading skills and help users become more confident and knowledgeable traders. Whether you are just starting out in the world of cryptocurrency trading or are looking to improve your skills, Babycoin is a great resource for learning and practicing your trades.
              </div>
            </div>
          :
          // LOGIN SIGNUP BOX
            <div id='loginSignupContainer' className='px-10 pt-10 pb-12'> {/**having px10 and py10 instead of p20 fixed centering problem of header */}
              <h2 className='text-6xl font-bold text-center py-4 italic text-zinc-200'>
                babycoin
              </h2>
              <div className='text-center hover:scale-105'>
                <small>{isLoginForm ? 'Not' : 'Already'} a member? <a className='text-orange-700 hover:text-orange-500 cursor-pointer' onClick={handleWhichForm}>{isLoginForm ? 'Sign Up Now!' : 'Login Now!'}</a></small>
              </div>
              <GoogleButton />
              {isLoginForm ? <LoginForm updateUser={updateUser} /> : <SignupForm updateUser={updateUser} />}
            </div>
          }
        </div>
        </div>
      </div>

      {/* switch button */}
      <div id='info' className='mt-3 text-center text-zinc-200'>
        <button onClick={toggleInfo} className='hover:scale-101'>
          {infoIsShown ? <em>back to login..</em> : <em>..what is babycoin?</em> }
        </button>
      </div>
    </div>
  )
}

export default Auth