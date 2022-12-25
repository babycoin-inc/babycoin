import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';
const PASSWORD_MIN_LENGTH = 3;

const LoginForm = ({ updateUser }) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const onFormSubmit = (data) => {
    const { username, password } = data;
    axios
      .post('/auth/login', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        console.log('DATA FROM SERVER: ', data);
        updateUser(data.id);
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 401) {
          setLoginError(true)
          setTimeout(() => {
            setLoginError(false)
          }, 5000)
        }
      })
  }

  return (
    // <form className="mt-6 flex flex-col gap-12 w-11/12 mx-auto">
    //   <div className="relative">
    //     <input id="username" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer' type='text' placeholder=" "/>
    //     <label for="username" className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
    //   </div>
    //   <div className="relative">
    //     <input id="password" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer' type='password' placeholder=" "/>
    //     <label for="password" className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    //   </div>
    <form onSubmit={handleSubmit(onFormSubmit)} >
      <div className='flex flex-col mb-4'>
        <label>Username</label>
        <input
          className='border relative bg-orange-100 p-2'
          name='username'
          type='text'
          {...register('username', {required: 'Username is required'})}
        />
        <small className='text-red-600 italic'>{errors.username?.message}</small>
      </div>

      {/* PASSWORD */}
      <div className='flex flex-col relative'>
        <label>Password</label>
          <input
            className='border relative bg-orange-100 p-2'
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
          <button className='text-xl absolute top-9 right-2' onClick={handleClickShowPassword}>
            {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
          </button>
        <small className='text-red-600 italic'>{errors.password?.message}</small>
        <small className='text-red-600 italic'>{loginError ? 'Problem logging in with username and password' : null }</small>
      </div>








      {/* <div className='flex flex-col'>
        <label>Password</label>
        <input
          name='password'
          className='border relative bg-orange-100 p-2'
          type='password'
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
        <small className='text-red-600 italic'>{errors.password?.message}</small>
        <small className='text-red-600 italic'>{loginError ? 'Problem logging in with username and password' : null }</small>
      </div> */}
      <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl'>Log In</button>
    </form>
  )
}

export default LoginForm