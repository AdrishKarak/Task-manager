import React, { useContext, useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';

const DashboardAdmin = () => {
    useUserAuth();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const [dashboardData, setDashboardData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const getDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Error fetching dashboard data", error);
        }
    }

    useEffect(() => {
        getDashboardData();

        return () => { };
    }, [])
    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className='card my-5'>
                <div>
                    <div className='col-span-3'>
                        <h2 className='text-xl md:text-2xl font-medium mt-2.5'> Hello! {user?.name}</h2>
                        <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
                            {moment().format("dddd Do MMMM YYYY")}
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardAdmin;