import React, { useContext, useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import { addThousandSeparator } from '../../utils/helper';
import InfoCard from '../../Components/Cards/InfoCard';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../Components/TaskListTable';

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

    const onSeeMore = () => {
        navigate('/admin/tasks');
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
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
                    <InfoCard
                        label="Total tasks"
                        value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
                        color="bg-blue-500"
                    />

                    <InfoCard
                        label="Pending tasks"
                        value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
                        color="bg-violet-500"
                    />

                    <InfoCard
                        label="In Progress tasks"
                        value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
                        color="bg-yellow-600"
                    />

                    <InfoCard
                        label="Completed tasks"
                        value={addThousandSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
                        color="bg-green-500"
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
                <div className='md:col-span-2'>
                    <div className='card'>
                        <div className='flex items-center justify-between'>
                            <h5 className='text-lg'>Recent Tasks</h5>
                            <button className='card-btn' onClick={onSeeMore}>See All
                                <LuArrowRight className='text-base' />
                            </button>
                        </div>
                        <TaskListTable tableData={dashboardData?.recentTasks || []} />
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default DashboardAdmin;