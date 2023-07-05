import React from 'react'
import { SidebarHeader } from './sidebar-header'
import { Notifications } from './notifications'
import { Search } from './search'

const Sidebar = () => {
  const [searchResults, setSearchResults] = React.useState([]);
  
  return (
    <div className='w-[40%] h-full select-none'>
        <SidebarHeader />
        <Notifications />
        <Search searchLength={searchResults.length} />
    </div>
  )
}

export default Sidebar