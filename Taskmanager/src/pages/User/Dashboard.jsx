import React, { useContext } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { UserContext } from '../../context/userContext';

const Dashboard = () => {
    useUserAuth();
    const { user } = useContext(UserContext);
    return (
        <DashboardLayout activeMenu="Dashboard">
        </DashboardLayout>
    );
};

export default Dashboard;