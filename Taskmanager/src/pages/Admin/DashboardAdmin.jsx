import React, { useContext } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { UserContext } from '../../context/userContext';
const DashboardAdmin = () => {
    useUserAuth();
    const { user } = useContext(UserContext);
    return (
        <DashboardLayout activeMenu="Dashboard">
            Dashboard
        </DashboardLayout>
    );
};

export default DashboardAdmin;