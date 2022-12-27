import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';

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
    <form onSubmit={handleSubmit(onFormSubmit)} >
      {/* USERNAME */}
      <div className='flex flex-col mb-4 mt-6 relative'>
        <input
          className='block bg-orange-100 py-2.5 pl-2 pr-0 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer'
          placeholder=" "
          id="username"
          name='username'
          type='text'
          {...register('username', {required: 'Username is required'})}
        />
        <label for="username" className="absolute text-md text-gray-600 duration-300 transform -translate-y-9 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:-translate-x-0">Username</label>
        <small className='text-red-600 italic'>{errors.username?.message}</small>
      </div>

      {/* PASSWORD */}
      <div className='flex flex-col relative mt-8'>
          <input
            className='block bg-orange-100 py-2.5 pl-2 pr-0 w-full text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-zinc-600 peer'
            placeholder=" "
            id="password"
            type={showPassword ? "text" : "password"}
            {...register('password',
            {
              required: 'Password is required'
            }
            )}
            />
          <label for="password" className="absolute text-md text-gray-600 duration-300 transform -translate-y-9 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:-translate-x-0">Password</label>
          <button className='text-xl absolute top-3 right-2' onClick={handleClickShowPassword}>
            {showPassword ? <AiFillEye/> : <AiFillEyeInvisible/>}
          </button>
        <small className='text-red-600 italic'>{errors.password?.message}</small>
        <small className='text-red-600 italic'>{loginError ? 'Problem logging in with username and password' : null }</small>
      </div>

      {/* LOGIN BUTTON */}
      <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl'>Log In</button>
    </form>
  )
}

export default LoginForm