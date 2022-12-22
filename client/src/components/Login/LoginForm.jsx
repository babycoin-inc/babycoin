import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
const PASSWORD_MIN_LENGTH = 3;

const LoginForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onFormSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} >
      <div className='flex flex-col mb-4'>
        <label>Username</label>
        <input name='username' className='border relative bg-orange-100 p-2' type='text' {...register('username', {required: 'Username is required'})}/>
      </div>
      <div className='flex flex-col'>
        <label>Password</label>
        <input name='password' className='border relative bg-orange-100 p-2' type='password' {...register('password', {required: 'Password is required', minLength: {value: PASSWORD_MIN_LENGTH, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`}})}/>
      </div>
      <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl'>Log In</button>
    </form>
  )
}

export default LoginForm