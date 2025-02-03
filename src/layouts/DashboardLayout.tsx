import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </>
    )
}

export default DashboardLayout