import appLogo from '../assets/logo.png'
import Navbar from './Navbar'

const Header = () => {
    return (
        <header className='flex flex-row h-[2.875rem]'>
            <div className='w-[25.25rem] h-[2.75rem]'>
                <img className='mx-auto object-scale-down w-[8rem] h-[2.75rem]' src={appLogo} alt="cherrybloom-logo" />
            </div>
            <Navbar />
        </header>
    )
}

export default Header