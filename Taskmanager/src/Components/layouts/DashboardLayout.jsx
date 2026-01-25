import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* TOP NAVBAR */}
            <Navbar
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
            />

            {user && (
                <div className="flex">
                    {/* SIDEBAR */}
                    <SideMenu isOpen={openSideMenu} />

                    {/* MAIN CONTENT */}
                    <main className="flex-1 px-5 pt-6 lg:ml-64">
                        {children}
                    </main>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
