import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import isStrongPassword from 'validator/lib/isStrongPassword';
import axios from 'axios';
const PASSWORD_MIN_LENGTH = 8;

const SignupForm = ({ updateUser }) => {
  const { register, handleSubmit, formState: {errors}, watch } = useForm();
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
      <div className='flex flex-col mb-4'>
        <label>Username</label>
        <input
          className='border relative bg-orange-100 p-2'
          name='username'
          type='text'
          {...register('username', {required: 'Username is required'})}
        />
        <small className='text-red-600 italic'>{errors.username?.message}</small>
        <small className='text-red-600 italic'>{signupError ? 'Username is unavailable' : null}</small>
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
        {strongPassword ? null : strongPasswordRequirements}
      </div>

      {/* COMPARE PASSWORD */}
      <div className='flex flex-col'>
        <label>Confirm Password</label>
        <input
          name='cpassword'
          className='border relative bg-orange-100 p-2'
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
        <small className='text-red-600 italic'>{errors.cpassword?.message}</small>
      </div>

      {/* SIGN UP BUTTON */}
      <button className='w-full py-3 mt-8 bg-orange-600 hover:bg-orange-500 relative text-white rounded-xl'>Sign Up</button>

    </form>
  )
}

export default SignupForm