import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = () => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className='flex gap-1 bg-white border-b boredr-gray-200 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 shadow-lg shadow-black/10'>
            <button className='block lg:hidden text-black' onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>
            <img src="/favicon.svg" alt="Logo" className='w-8 h-8' />
            <h2 className='text-lg font-medium text-black'> Task Manager </h2>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>

            )}

        </div>
    );
};

export default Navbar;