import React, { useEffect, useState } from 'react';
import DashbordLayout from '../../Components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../Components/Cards/UserCard';

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.log("Error fetching users", error);
            toast.error("Error fetching users");
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
                    < button className='flex md:flex download-btn' onClick={handleReportDownload}> <LuFileSpreadsheet className="text-lg" /> Download Report</button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {allUsers?.map((user) => (
                        <UserCard key={user._id} userInfo={user} />
                    ))}
                </div>
            </div>
        </DashbordLayout>
    );
};

export default ManageUsers;