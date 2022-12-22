import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleButton = () => {
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.open('http://localhost:3000/auth/google', '_self')
  }

  return (
    <div className='flex justify-center py-8'>
      <button
        className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center rounded-xl'
        onClick={handleGoogleLogin}>
        <FcGoogle className='mr-2' />
          Google
      </button>
    </div>
  )
}

export default GoogleButton