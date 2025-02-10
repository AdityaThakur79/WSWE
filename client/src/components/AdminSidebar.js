import React from 'react'
import { useDashboardContext } from '../context/dashboardContextProvider'
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { MdCancel } from "react-icons/md";

import { Links } from '../Data'
import { Link, NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    const { activeSidebar, setActiveSidebar, screenSize, setScreenSize } = useDashboardContext()

    // below is to handle closedSidebar
    const handleClosedSidebar = () => {
        if (activeSidebar && screenSize <= 900) {
            setActiveSidebar(false);
        }
    }

    // below is the links for managaging the active and non active links
    const activeLink = 'flex items-center px-4 pt-3 pb-2.5 rounded-lg text-white  mx-2 bg-[#FAA845] text-extrabold'
    const normalLink = 'flex items-center px-4 pt-3 pb-2.5 rounded-lg text-md mx-2 text-gray-700'
    return (
        <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
            {
                activeSidebar && (
                    <>
                        <div className='flex justify-between items-center bg-white' style={{
                            zIndex: 1
                        }}>
                            < Link to='/' onClick={handleClosedSidebar} className='items-center flex mt-4 text-xl font-extrabold tracking-tight text-[#FAA845] gap-3' >
                                <AiFillSafetyCertificate />
                                <span style={{ fontFamily: "'Roboto', sans-serif" }}>WSWE</span></Link>
                            <TooltipComponent content="Menu" position='BottomCenter'>
                                <button type='button' onClick={() => setActiveSidebar((prevActiveMenu) => !prevActiveMenu)} className='text-xl hover:bg-light-gray text-slate-900 rounded-full   block mt-5'>
                                    <MdCancel />
                                </button>
                            </TooltipComponent>
                        </div>
                        <div className='mt-10'>
                            {
                                Links.map((item) => (
                                    <div key={item.title}>
                                        <p className='text-gray-400 m-3 mt-4 uppercase' style={{ fontFamily: "'Roboto', sans-serif" }}>
                                            {item.title}
                                        </p>
                                        {
                                            item.links.map((link) => (
                                                <NavLink to={`/${link.linkto}`} key={link.name} onClick={handleClosedSidebar} className={({ isActive }) =>
                                                    isActive ? activeLink : normalLink
                                                }>
                                                    {link.icon}
                                                    <span className='capitalize' style={{ fontFamily: "'Roboto', sans-serif" }}>{link.name}</span>
                                                </NavLink>
                                            ))
                                        }
                                    </div>

                                ))
                            }
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default AdminSidebar
