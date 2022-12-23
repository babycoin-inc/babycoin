import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
const PASSWORD_MIN_LENGTH = 3;

const SignupForm = ({ updateUser }) => {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onFormSubmit = (data) => {
    const { username, password } = data;
    axios
      .post('/auth/signup', {
        username: username,
        password: password
      })
      .then(({ data }) => {
        updateUser(data.id);
      })
      .catch(err => {
        alert('Something went wrong...')
        console.log(err)
      });
  }

  return (
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
      <div className='flex flex-col'>
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
      </div>
      <div className='flex flex-col'>
        <label>Confirm Password</label>
        <input
          name='cpassword'
          className='border relative bg-orange-100 p-2'
          type='password'
          {...register('cpassword', { required: 'Must re-enter password' })}
        />
        <small className='text-red-600 italic'>{errors.cpassword?.message}</small>
      </div>
      <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl'>Sign Up</button>
    </form>
  )
}

export default SignupForm