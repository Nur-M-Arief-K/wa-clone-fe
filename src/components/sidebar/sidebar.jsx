import React from 'react'
import { SidebarHeader } from './sidebar-header'
import { Notifications } from './notifications'

const Sidebar = () => {
  return (
    <div className='w-[40%] h-full select-none'>
        <SidebarHeader />
        <Notifications />
    </div>
  )
}

export default Sidebar