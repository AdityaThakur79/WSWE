import React, { useEffect } from 'react'
import { useDashboardContext } from '../context/dashboardContextProvider'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { AiOutlineMenu } from 'react-icons/ai'
// creating the navbutton component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position='BottomCenter'>
        <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
            <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
            {icon}
        </button>
    </TooltipComponent>
)
const AdminNavbar = () => {
    const { setActiveSidebar, screenSize, setScreenSize } = useDashboardContext()

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveSidebar(false);
        } else {
            setActiveSidebar(true);
        }
    }, [screenSize])
    return (
        <div className='flex justify-between p-2md:ml-6 md:mr-6 relative w-full'>
            <div>
                <NavButton title="Menu" customFunc={() => setActiveSidebar((prevActiveMenu) => !prevActiveMenu)} color='#FAA845' icon={<AiOutlineMenu style={{ fontWeight: 'bold', fontSize: '30px' }} />}>

                </NavButton>
            </div>
            <div className='md:mr-10 md:mt-4'>
                <p className='text-3xl font-bold tracking-tight text-[#FAA845]' style={{ fontFamily: "'Roboto', sans-serif" }}>Admin Dashboard</p>
            </div>
        </div>
    )
}

export default AdminNavbar
