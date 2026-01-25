import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import defaultAvatar from "../../assets/panda.png";

const SideMenu = ({ isOpen }) => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            setSideMenuData(
                user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
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
        <aside
            className={`
        fixed top-[64px] left-0 z-40
        w-64 h-[calc(100vh-64px)]
        bg-white border-r border-gray-200
        shadow-[2px_0_8px_rgba(0,0,0,0.12)]
        transition-transform duration-300
        overflow-y-auto

        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
        >
            {/* USER INFO */}
            <div className="flex flex-col items-center justify-center mb-7 pt-5">
                <img
                    src={user?.profileImageUrl || defaultAvatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full bg-slate-400"
                />

                {user?.role === 'admin' && (
                    <span className="mt-1 text-[10px] text-white bg-blue-500 px-3 py-0.5 rounded">
                        Admin
                    </span>
                )}

                <h5 className="mt-3 text-gray-900 font-medium">
                    {user?.name}
                </h5>
                <p className="text-gray-500 text-xs">
                    {user?.email}
                </p>
            </div>

            {/* MENU ITEMS */}
            <nav>
                {sideMenuData.map((item, index) => {
                    const isActive = location.pathname.startsWith(item.path);

                    return (
                        <button
                            key={`menu_${index}`}
                            onClick={() => handleClick(item.path)}
                            className={`
                w-full flex items-center gap-4 px-6 py-3 mb-1
                text-sm transition-all duration-200
                hover:bg-blue-50
                ${isActive
                                    ? 'text-blue-500 bg-blue-50 border-r-4 border-blue-500'
                                    : 'text-gray-700'}
              `}
                        >
                            <item.icon className="text-xl" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SideMenu;
