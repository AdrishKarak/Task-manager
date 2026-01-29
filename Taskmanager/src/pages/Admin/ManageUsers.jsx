import React, { useEffect, useState } from 'react';
import DashbordLayout from '../../Components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../Components/Cards/UserCard';

// Skeleton Card Component
const UserCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
        </div>
    );
};

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.log("Error fetching users", error);
            toast.error("Error fetching users");
        } finally {
            setIsLoading(false);
        }
    };

    //handle report download
    const handleReportDownload = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
                responseType: 'blob',
            });

            //Create a Url for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.xlsx');
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
        getAllUsers();
        return () => { };
    }, []);

    return (
        <DashbordLayout activeMenu="Team Members">
            <div className='mt-5 mb-10'>
                <div className='flex md:flex-row md:items-center justify-between'>
                    <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>
                    <button
                        className='flex md:flex download-btn'
                        onClick={handleReportDownload}
                        disabled={isLoading}
                    >
                        <LuFileSpreadsheet className="text-lg" /> Download Report
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {isLoading ? (
                        // Show 6 skeleton cards while loading
                        Array.from({ length: 6 }).map((_, index) => (
                            <UserCardSkeleton key={index} />
                        ))
                    ) : (
                        // Show actual user cards when loaded
                        allUsers?.map((user) => (
                            <UserCard key={user._id} userInfo={user} />
                        ))
                    )}
                </div>

                {/* Optional: Show message if no users */}
                {!isLoading && allUsers.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No team members found
                    </div>
                )}
            </div>
        </DashbordLayout>
    );
};

export default ManageUsers;