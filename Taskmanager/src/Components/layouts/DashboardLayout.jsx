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
                <div className="flex relative">
                    {/* SIDEBAR */}
                    <SideMenu isOpen={openSideMenu} />

                    {/* DARK OVERLAY - Only visible on mobile when sidebar is open */}
                    {openSideMenu && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 lg:hidden top-[64px]"
                            onClick={() => setOpenSideMenu(false)}
                            aria-hidden="true"
                        />
                    )}

                    {/* MAIN CONTENT */}
                    <main className="flex-1 px-5 pt-6 lg:ml-64 w-full min-w-0">
                        {children}
                    </main>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;