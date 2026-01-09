import React from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';

const DashboardAdmin = () => {
    useUserAuth();
    return (
        <div>Dashboard</div>
    );
};

export default DashboardAdmin;