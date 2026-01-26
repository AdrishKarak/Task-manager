import React from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = ({ openSideMenu, setOpenSideMenu }) => {
    return (
        <div className="flex gap-1 bg-white border-b border-gray-200 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50 shadow-md shadow-black/10 ">

            <button
                className="block lg:hidden text-black"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            <img src="/favicon.svg" alt="Logo" className="w-8 h-8 ml-2" />
            <h2 className="text-lg font-medium text-black">Task Manager</h2>
        </div>
    );
};

export default Navbar;
