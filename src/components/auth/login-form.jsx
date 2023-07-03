import React from 'react'

const LoginForm = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      <div className='max-w-md p-10 space-y-8 rounded-xl dark:bg-dark_bg_2'>
        <div className='text-center dark:text-dark_text_1'>
          <h2 className='mt-6 text-3xl font-bold'>Welcome back</h2>
          <p className='mt-2 text-sm'>Sign in</p>
        </div>
          <form className='mt-6 space-y-6'></form>
      </div>
    </div>
  )
}

export default LoginForm