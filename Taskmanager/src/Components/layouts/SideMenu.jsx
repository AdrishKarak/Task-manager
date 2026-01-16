import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu, isOpen }) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setSideMenuData(
                user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
            );
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    const handleClick = (route) => {
        if (route === 'logout') {
            handleLogout();
            return;
        }
        navigate(route);
    };

    return (
        <div
            className={`
    w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-900 
    shadow-[2px_0_8px_rgba(0,0,0,0.12)]
    transition-transform duration-300

    /* MOBILE: place sidebar BELOW navbar */
    fixed top-[64px] left-0 z-40
    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    /* DESKTOP: normal layout */
    lg:static lg:translate-x-0 lg:h-[calc(100vh-61px)]
  `}
        >
            <div className="flex flex-col items-center justify-center mb-7 pt-5">
                <img
                    src={user?.profileImageUrl || ''}
                    alt="Profile"
                    className="w-20 h-20 rounded-full bg-slate-400"
                />

                {user?.role === 'admin' && (
                    <div className="text-[10px] text-white bg-blue-400 px-3 py-0.5 rounded mt-1">
                        Admin
                    </div>
                )}

                <h5 className="mt-3 text-gray-950 font-medium leading-6">
                    {user?.name || ''}
                </h5>
                <p className="text-gray-500 text-[12px]">
                    {user?.email || ''}
                </p>
            </div>

            {sideMenuData.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px]
            ${activeMenu === item.label
                            ? 'text-blue-400 bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3'
                            : ''
                        }
            py-3 px-6 mb-3 cursor-pointer transition-all duration-300 
            hover:bg-blue-50/50`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
