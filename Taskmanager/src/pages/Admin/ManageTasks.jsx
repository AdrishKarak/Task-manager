import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../Components/TaskStatusTabs';
import TaskCard from '../../Components/Cards/TaskCard';

const ManageTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const getAllTasks = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
                params: {
                    status: filterStatus === "All" ? "" : filterStatus
                }
            });
            setAllTasks(response.data?.tasks?.length > 0 ? response.data?.tasks : []);

            const statusSummary = response.data?.statusSummary || {};

            const statusArray = [
                { label: "All", count: statusSummary.all || 0 },
                { label: "Pending", count: statusSummary.pendingTasks || 0 },
                { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
                { label: "Completed", count: statusSummary.completedTasks || 0 },
            ];
            setTabs(statusArray);
        } catch (error) {
            console.log("Error fetching tasks", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = (taskData) => {
        navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
    };

    const handleDownloadReport = async () => {
        try {
            // TODO: Implement download report functionality
            console.log("Download report functionality to be implemented");
        } catch (error) {
            console.log("Error downloading report", error);
        }
    };

    useEffect(() => {
        getAllTasks();
    }, [filterStatus]);

    return (
        <DashboardLayout activeMenu="Manage Tasks">
            <div className='my-5'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                    <div className='flex items-center justify-between gap-3'>
                        <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>
                            My Tasks
                        </h2>
                        <button
                            className='flex lg:hidden download-btn items-center gap-2'
                            onClick={handleDownloadReport}
                        >
                            <LuFileSpreadsheet className='text-lg' />
                            <span className='hidden sm:inline'>Download Report</span>
                        </button>
                    </div>
                    {tabs.length > 0 && tabs[0]?.count > 0 && (
                        <div className='flex items-center gap-3'>
                            <TaskStatusTabs
                                tabs={tabs}
                                activeTab={filterStatus}
                                setActiveTab={setFilterStatus}
                            />
                            <button
                                className='download-btn hidden lg:flex items-center gap-2'
                                onClick={handleDownloadReport}
                            >
                                <LuFileSpreadsheet className='text-lg' />
                                Download Report
                            </button>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className='flex items-center justify-center py-20'>
                        <div className='text-gray-500'>Loading tasks...</div>
                    </div>
                ) : allTasks.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20'>
                        <div className='text-gray-400 text-lg mb-2'>No tasks found</div>
                        <p className='text-gray-500 text-sm'>
                            {filterStatus !== 'All'
                                ? `No ${filterStatus.toLowerCase()} tasks available`
                                : 'Create your first task to get started'}
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                        {allTasks.map((item) => (
                            <TaskCard
                                key={item._id}
                                title={item.title}
                                description={item.description}
                                status={item.status}
                                priority={item.priority}
                                progress={item.progress}
                                createdAt={item.createdAt}
                                dueDate={item.dueDate}
                                assignedTo={item.assignedTo?.map((user) => user.profileImageUrl)}
                                attachmentCount={item.attachments?.length || 0}
                                completedTodoCount={item.completedTodoCount || 0}
                                todoChecklist={item.todoChecklist || []}
                                onClick={() => handleClick(item)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ManageTasks;