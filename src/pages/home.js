import React from 'react'
import { Sidebar } from '../components/sidebar'

const Home = () => {
  return (
    <div className='min-h-screen py-[19px] flex items-center justify-center dark:bg-dark_bg_1 overflow-hidden'>
      <div className='container min-h-screen flex'>
        <Sidebar />      
      </div>
    </div>
  )
}

export default Home