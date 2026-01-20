import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div>
            <Navbar
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
            />

            {user && (
                <div className="relative flex">
                    {/* SIDEBAR */}
                    <SideMenu isOpen={openSideMenu} />

                    {/* MAIN CONTENT */}
                    <div className="flex-1 mx-5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
