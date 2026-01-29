// pages/User/MyTasks.jsx
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import TaskStatusTabs from '../../Components/TaskStatusTabs';
import TaskCard from '../../Components/Cards/TaskCard';

const TaskCardSkeleton = () => (
    <div className='bg-white rounded-xl p-4 shadow-md border border-white animate-pulse'>
        {/* Header Section */}
        <div className='flex items-start justify-between mb-4'>
            <div className='flex-1'>
                {/* Title */}
                <div className='h-5 bg-gray-300 rounded w-3/4 mb-2'></div>
                {/* Subtitle */}
                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
            </div>
            {/* Status badge placeholder */}
            <div className='h-6 w-20 bg-gray-300 rounded-full'></div>
        </div>

        {/* Description */}
        <div className='space-y-2 mb-4'>
            <div className='h-3 bg-gray-200 rounded w-full'></div>
            <div className='h-3 bg-gray-200 rounded w-5/6'></div>
            <div className='h-3 bg-gray-200 rounded w-4/6'></div>
        </div>

        {/* Tags/Labels */}
        <div className='flex gap-2 mb-4'>
            <div className='h-6 w-16 bg-gray-300 rounded'></div>
            <div className='h-6 w-20 bg-gray-300 rounded'></div>
        </div>

        {/* Footer Section */}
        <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
            {/* Avatar group */}
            <div className='flex -space-x-2'>
                <div className='w-8 h-8 bg-gray-300 rounded-full border-2 border-white'></div>
                <div className='w-8 h-8 bg-gray-300 rounded-full border-2 border-white'></div>
                <div className='w-8 h-8 bg-gray-300 rounded-full border-2 border-white'></div>
            </div>
            {/* Icons/Metadata */}
            <div className='flex gap-3'>
                <div className='h-4 w-12 bg-gray-300 rounded'></div>
                <div className='h-4 w-12 bg-gray-300 rounded'></div>
            </div>
        </div>
    </div>
);

const MyTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const getAllTasks = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
                params: { status: filterStatus === "All" ? "" : filterStatus }
            });

            setAllTasks(response.data?.tasks || []);

            const summary = response.data?.statusSummary || {};
            setTabs([
                { label: "All", count: summary.all || 0 },
                { label: "Pending", count: summary.pendingTasks || 0 },
                { label: "In Progress", count: summary.inProgressTasks || 0 },
                { label: "Completed", count: summary.completedTasks || 0 },
            ]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = (taskId) => {
        navigate(`/user/task-details/${taskId}`);
    };

    useEffect(() => {
        console.log("MyTasks - Filter changed or navigated to page, fetching tasks");
        getAllTasks();
    }, [filterStatus, location.pathname]); // Refetch when filter changes OR when navigating to this page

    useEffect(() => {
        // Refetch data when page becomes visible again
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                console.log("MyTasks visible - refetching data");
                getAllTasks();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <DashboardLayout activeMenu="My Tasks">
            <div className='my-5'>
                {tabs.length > 0 && (
                    <TaskStatusTabs
                        tabs={tabs}
                        activeTab={filterStatus}
                        setActiveTab={setFilterStatus}
                    />
                )}

                {isLoading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                        {[...Array(6)].map((_, i) => <TaskCardSkeleton key={i} />)}
                    </div>
                ) : allTasks.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                        {allTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                {...task}
                                assignedTo={task.assignedTo?.map(u => u.profileImageUrl)}
                                attachmentCount={task.attachments?.length || 0}
                                onClick={() => handleClick(task._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12 text-gray-500'>
                        <p className='text-lg'>No tasks found</p>
                        <p className='text-sm mt-2'>Tasks matching your filter will appear here</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyTasks;