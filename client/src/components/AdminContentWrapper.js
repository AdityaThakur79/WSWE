import React from 'react'
import { useDashboardContext } from '../context/dashboardContextProvider'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'
const AdminContentWrapper = ({ children }) => {
    const { activeSidebar } = useDashboardContext()
    return (
        <div className='flex relative'>
            {activeSidebar ? (<div className=' w-72 bg-white fixed sidebar z-50'>
                <AdminSidebar />
            </div>) : (<div className='w-0'>
                <AdminSidebar />
            </div>)

            }
            <div className={`bg-main-bg min-h-screen w-full ${activeSidebar ? 'md:ml-36' : 'flex-2'}`}>
                <div className="fixed  md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                    <AdminNavbar />
                </div>
                <div className={`${activeSidebar ? 'md:ml-40' : 'ml-2'}`}>{children}</div>
            </div>
        </div>
    )
}

export default AdminContentWrapper
