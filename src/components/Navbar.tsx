import React from 'react'
import SearchBar from './SearchBar'
import Profile from './Profile'

const Navbar = () => {
    return (
        <nav className='flex-auto flex justify-between items-center px-2'>
            <div className=''>
                <SearchBar />
            </div>
            <Profile />
        </nav>
    )
}

export default Navbar