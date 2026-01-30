import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../Components/TaskStatusTabs';
import TaskCard from '../../Components/Cards/TaskCard';
import toast from 'react-hot-toast';

const TaskCardSkeleton = () => {
    return (
        <div className='bg-white rounded-xl py-4 shadow-md shadow-gray-200 border border-gray-200/50 animate-pulse'>
            <div className='flex items-center gap-2 px-4'>
                <div className='h-6 w-20 bg-gray-200 rounded-md'></div>
                <div className='h-6 w-24 bg-gray-200 rounded-md'></div>
            </div>

            <div className='px-4 mt-3 border-l-[3px] border-gray-300'>
                <div className='h-4 bg-gray-200 rounded w-3/4 mt-2'></div>
                <div className='h-3 bg-gray-200 rounded w-full mt-3'></div>
                <div className='h-3 bg-gray-200 rounded w-2/3 mt-2'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2 mt-3 mb-2'></div>
                <div className='w-full bg-gray-200 rounded-full h-2'></div>
            </div>

            <div className='px-4 mt-4'>
                <div className='flex items-center justify-between mb-3'>
                    <div>
                        <div className='h-3 bg-gray-200 rounded w-16 mb-1'></div>
                        <div className='h-4 bg-gray-200 rounded w-20 mt-1'></div>
                    </div>
                    <div>
                        <div className='h-3 bg-gray-200 rounded w-16 mb-1'></div>
                        <div className='h-4 bg-gray-200 rounded w-20 mt-1'></div>
                    </div>
                </div>

                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                    <div className='flex items-center -space-x-2'>
                        <div className='h-8 w-8 rounded-full bg-gray-200'></div>
                        <div className='h-8 w-8 rounded-full bg-gray-200'></div>
                        <div className='h-8 w-8 rounded-full bg-gray-200'></div>
                    </div>
                    <div className='h-7 w-12 bg-gray-200 rounded-lg'></div>
                </div>
            </div>
        </div>
    );
};

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
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
                responseType: 'blob',
            })

            //Create a Url for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'task_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Error downloading report", error);
            toast.error("Error downloading report. Please try again later");
        }
    };

    useEffect(() => {
        getAllTasks();
    }, [filterStatus]);

    return (
        <DashboardLayout activeMenu="Manage Tasks">
            <div className='my-5 w-full max-w-full overflow-x-hidden'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full'>
                    <div className='flex items-center justify-between gap-3 min-w-0'>
                        <h2 className='text-xl md:text-2xl font-semibold text-gray-800 truncate'>
                            My Tasks
                        </h2>
                        <button
                            className='flex lg:hidden download-btn items-center gap-2 flex-shrink-0'
                            onClick={handleDownloadReport}
                        >
                            <LuFileSpreadsheet className='text-lg' />
                            <span className='hidden sm:inline whitespace-nowrap'>Download Report</span>
                        </button>
                    </div>
                    {tabs.length > 0 && tabs[0]?.count > 0 && (
                        <div className='flex items-center gap-3 w-full lg:w-auto overflow-x-auto'>
                            <TaskStatusTabs
                                tabs={tabs}
                                activeTab={filterStatus}
                                setActiveTab={setFilterStatus}
                            />
                            <button
                                className='download-btn hidden lg:flex items-center gap-2 flex-shrink-0 whitespace-nowrap'
                                onClick={handleDownloadReport}
                            >
                                <LuFileSpreadsheet className='text-lg' />
                                Download Report
                            </button>
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full'>
                        {[...Array(6)].map((_, index) => (
                            <TaskCardSkeleton key={index} />
                        ))}
                    </div>
                ) : allTasks.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 w-full'>
                        <div className='text-gray-400 text-lg mb-2'>No tasks found</div>
                        <p className='text-gray-500 text-sm text-center px-4'>
                            {filterStatus !== 'All'
                                ? `No ${filterStatus.toLowerCase()} tasks available`
                                : 'Create your first task to get started'}
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full'>
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