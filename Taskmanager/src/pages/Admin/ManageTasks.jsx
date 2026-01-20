import React, { useState } from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { PRIORITY_DATA } from '../../utils/data';
import axiosInstance from '../../utils/axiosinstance';
import toast from "react-hot-toast";
import { API_PATHS } from '../../utils/apiPaths';
import moment from "moment";
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash2 } from 'react-icons/lu';

const ManageTasks = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { taskId } = location.state || {};

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        priority: 'Low',
        dueDate: null,
        assignedTo: [],
        attachments: [],
        todoCheckList: [],
    });

    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleValueChange = (key, value) => {
        setTaskData((prevData) => ({ ...prevData, [key]: value }))
    };

    const clearData = () => {
        setTaskData({
            title: '',
            description: '',
            priority: 'Low',
            dueDate: null,
            assignedTo: [],
            attachments: [],
            todoCheckList: [],
        });
    };

    //CreateTask
    const createTask = async () => { };

    //Update Task
    const updataTask = async () => { };

    const handleSubmit = async () => { };

    //get Task info by id
    const getTaskDetailsById = async () => { };

    //Delete Task
    const deleteTask = async () => { };

    return (
        <DashboardLayout activeMenu="Manage Tasks">Manage Tasks</DashboardLayout>
    );
};

export default ManageTasks;