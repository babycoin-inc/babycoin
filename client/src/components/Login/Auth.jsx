import React, {useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import babycoinLogo from '../../../dist/assets/BabyCoinHalfLogo.png';
import babycoinblink from '../../../dist/assets/BabyCoinHalfLogoBlink.png';
import babycoinSleep from '../../../dist/assets/BabyCoinBothEyesClosedHalf.png'
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import GoogleButton from './GoogleButton.jsx';

const Auth = ({ updateUser }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [blinking, setBlinking] = useState(false);

  const [isSleeping, setIsSleeping] = useState(true);
  const [infoIsShown, setInfoIsShown] = useState(false);

  const [isShowing, setIsShowing] = useState(false)


  const handleWhichForm = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
  }


  const toggleInfo = () => {
    setInfoIsShown(!infoIsShown);
  }

  const flipHandler = (e) => {
    e.preventDefault();

  }

  return (
    <div className={`relative w-full min-h-screen`}>
      <div className='flex flex-col justify-center items-center pt-28 z-10 relative'>
        {isSleeping ?
          <img src={babycoinSleep} className='w-48 h-48'/>
        :
        <div className="will-change-contents" onMouseEnter={(() => setBlinking(true))} onMouseLeave={() => setBlinking(false)}>
          {!blinking && <img className= 'w-48 h-48 transition-all' src={babycoinLogo} alt='babycoin'/>}
          {blinking && <img className= 'w-48 h-48 transition-all' src={babycoinblink} alt='babycoin'/>}
        </div>
        }

      </div>

      {/* Border */}
      <div className='border-t-2 border-b-2 border-zinc-600 hover:border-zinc-400 transform transition duration-300 max-w-[450px] w-full -mt-14 mx-auto rounded-xl pb-10 z-0 relative'>

        {/* solid background card */}
          <div
            onMouseEnter={()=>setIsSleeping(false)}
            className='relative w-full h-full border-2 border-zinc-900 max-w-[375px] bg-zinc-800 rounded-xl mx-[37.5px] mt-12 text-zinc-200'>

              {/**LOGIN SIGNUP BOX */}
              <div id='loginSignupContainer' className='h-full w-full px-10 pt-10 pb-12'>
                <h2 className='text-6xl font-bold text-center py-4 italic text-zinc-200'>
                  babycoin
                </h2>
                <div className='text-center hover:scale-105'>
                  <small>
                    {isLoginForm ? 'Not' : 'Already'} a member?
                      <a className='text-orange-700 hover:text-orange-500 cursor-pointer'
                         onClick={handleWhichForm}>{isLoginForm ? 'Sign Up Now!' : 'Login Now!'}
                      </a>
                  </small>
                </div>
                {/* <GoogleButton /> */} {/*Google Button Currently disabled until oAuth is correctly hooked up to EC2 instance*/}
                {isLoginForm ? <LoginForm updateUser={updateUser} /> : <SignupForm updateUser={updateUser} />}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Auth