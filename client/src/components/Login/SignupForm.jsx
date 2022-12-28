import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import isStrongPassword from 'validator/lib/isStrongPassword';
import axios from 'axios';
const PASSWORD_MIN_LENGTH = 8;

const SignupForm = ({ updateUser }) => {
  const { register, handleSubmit, formState: {errors}, watch } = useForm();
  const [usernameError, setUsernameError] = useState(false)
  const [signupError, setSignupError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(true);

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const onFormSubmit = (data) => {
    const { username, password } = data;
    setStrongPassword(true);
    if(!isStrongPassword(password)) return setStrongPassword(false);
    axios
      .post('/auth/signup', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        updateUser(data.id);
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 409) {
          setUsernameError(true);
          setTimeout(() => {
            setUsernameError(false);
          }, 5000)
        } else {
          setSignupError(true);
          setTimeout(() => {
            setSignupError(false);
          }, 5000)
        }
      });
  }

  const strongPasswordRequirements = (

    <ul className='text-red-600 italic list-disc list-inside'>
      <li><small>Must contain at least one lowercase letter</small></li>
      <li><small>Must contain at least one uppercase letter</small></li>
      <li><small>Must contain at least one number</small></li>
      <li><small>Must contain at least one special character</small></li>
    </ul>

  )

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} >

      {/* USERNAME */}
      <div className='flex flex-col mb-4 mt-6 relative'>
        <input
          className='block bg-zinc-200 py-2.5 pl-2 pr-0 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer'
          placeholder=" "
          id="username"
          name='username'
          type='text'
          {...register('username', {required: 'Username is required'})}
        />
        <label for="username" className="absolute text-md text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:-translate-x-0">Username</label>
        <small className='text-red-600 italic'>{errors.username?.message}</small>
        <small className='text-red-600 italic'>{usernameError ? 'Username is unavailable' : null}</small>
        <small className='text-red-600 italic'>{signupError ? 'There was a problem signing up' : null}</small>
      </div>

      {/* PASSWORD */}
      <div className='flex flex-col relative mt-8'>
        <input
          className='block bg-zinc-200 py-2.5 pl-2 pr-0 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer'
          placeholder=" "
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          {...register('password',
          {
            required: 'Password is required',
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
            }
          }
          )}
          />
        <label for="password" className="absolute text-md text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:-translate-x-0">Password</label>
        <button className='text-xl text-zinc-800 absolute top-3 right-2' type="button" onClick={handleClickShowPassword}>
          {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
        </button>
        <small className='text-red-600 italic'>{errors.password?.message}</small>
        {strongPassword ? null : strongPasswordRequirements}
      </div>

      {/* COMPARE PASSWORD */}
      <div className='flex flex-col relative mt-8'>
        <input
          className='block bg-zinc-200 py-2.5 pl-2 pr-0 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer'
          placeholder=" "
          id="cpassword"
          name='cpassword'
          type={showPassword ? "text" : "password"}
          {...register('cpassword', {
            required: 'Must re-enter password',
            validate: (cpassword) => {
              if(watch('password') !== cpassword) {
                return "Your passwords do not match";
              }
            }
          })}
          />
        <label for="cpassword" className="absolute text-md text-gray-400 duration-300 transform -translate-y-9 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:-translate-x-0">Confirm Password</label>
        <small className='text-red-600 italic'>{errors.cpassword?.message}</small>
      </div>

      {/* SIGN UP BUTTON */}
      <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl'>Sign Up</button>

    </form>
  )
}

export default SignupForm