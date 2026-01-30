import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* TOP NAVBAR */}
            <Navbar
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
            />

            {user && (
                <>
                    {/* DARK OVERLAY - Only visible on mobile when sidebar is open */}
                    {openSideMenu && (
                        <div
                            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                            style={{ top: '64px' }}
                            onClick={() => setOpenSideMenu(false)}
                        />
                    )}

                    <div className="flex overflow-x-hidden">
                        {/* SIDEBAR */}
                        <SideMenu isOpen={openSideMenu} />

                        {/* MAIN CONTENT */}
                        <main className="flex-1 px-5 pt-6 lg:ml-64 w-full min-w-0 max-w-full overflow-x-hidden">
                            {children}
                        </main>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardLayout;