import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2, LuX } from "react-icons/lu";
import SelectDropdown from "../../Components/Inputs/SelectDropdown";
import SelectUsers from "../../Components/Inputs/SelectUsers";
import TodoListInput from "../../Components/Inputs/TodoListInput";
import AddAttachments from "../../Components/Inputs/AddAttachments";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import moment from "moment";

// Skeleton Loading Component
const TaskFormSkeleton = () => {
    return (
        <div className="form-card col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="h-6 bg-slate-200 rounded w-32"></div>
            </div>

            {/* Body Skeleton */}
            <div className="p-6 space-y-4">
                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                    <div className="h-24 bg-slate-200 rounded"></div>
                </div>

                {/* Priority & Due Date Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                        <div className="h-10 bg-slate-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                        <div className="h-10 bg-slate-200 rounded"></div>
                    </div>
                </div>

                {/* Assigned Users Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-28"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                </div>

                {/* TODO Checklist Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                </div>

                {/* Attachments Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-36"></div>
                    <div className="h-16 bg-slate-200 rounded"></div>
                </div>

                {/* Button Skeleton */}
                <div className="flex justify-end gap-3 mt-7">
                    <div className="h-10 bg-slate-200 rounded w-32"></div>
                </div>
            </div>
        </div>
    );
};

const CreateTask = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { taskId } = location.state || {};

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
        assignedTo: [],
        attachments: [],
        todoCheckList: [],
    });

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false); // For initial page load
    const [errors, setErrors] = useState({});
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    // Load draft from localStorage on mount
    useEffect(() => {
        const draft = localStorage.getItem('taskDraft');
        if (draft && !taskId) {
            const parsedDraft = JSON.parse(draft);
            if (parsedDraft.title || parsedDraft.description) {
                setTaskData(parsedDraft);
                toast.success('Draft restored!', { duration: 2000 });
            }
        }
    }, [taskId]);

    // Auto-save draft
    useEffect(() => {
        if ((taskData.title || taskData.description) && !taskId) {
            localStorage.setItem('taskDraft', JSON.stringify(taskData));
            setHasUnsavedChanges(true);
        }
    }, [taskData, taskId]);

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    const handleValueChange = (key, value) => {
        setTaskData((prev) => ({
            ...prev,
            [key]: value,
        }));
        // Clear error for this field
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: "" }));
        }
    };

    const clearData = () => {
        setTaskData({
            title: "",
            description: "",
            priority: "Low",
            dueDate: "",
            assignedTo: [],
            attachments: [],
            todoCheckList: [],
        });
        localStorage.removeItem('taskDraft');
        setHasUnsavedChanges(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!taskData.title.trim()) {
            newErrors.title = "Task title is required";
        } else if (taskData.title.length > 100) {
            newErrors.title = "Title must be less than 100 characters";
        }

        if (!taskData.description.trim()) {
            newErrors.description = "Task description is required";
        } else if (taskData.description.length > 500) {
            newErrors.description = "Description must be less than 500 characters";
        }

        if (!taskData.priority.trim()) {
            newErrors.priority = "Task priority is required";
        }

        if (!taskData.dueDate.trim()) {
            newErrors.dueDate = "Task due date is required";
        } else {
            // Validate date is not in the past
            const selectedDate = new Date(taskData.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                newErrors.dueDate = "Due date cannot be in the past";
            }
        }

        if (taskData.assignedTo?.length === 0) {
            newErrors.assignedTo = "Task must be assigned to at least one person";
        }

        if (taskData.todoCheckList?.length === 0) {
            newErrors.todoCheckList = "At least one todo item is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createTask = async () => {
        try {
            const todoList = taskData.todoCheckList?.map((item) => ({
                text: item,
                completed: false,
            }));

            const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString(),
                todoCheckList: todoList,
            });

            toast.success("Task created successfully! 🎉");
            clearData();
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Create task error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
            throw error;
        }
    };

    const updateTask = async () => {
        try {
            const todoList = taskData.todoCheckList?.map((item) => ({
                text: item,
                completed: false,
            }));

            const response = await axiosInstance.put(
                API_PATHS.TASKS.UPDATE_TASK(taskId),
                {
                    ...taskData,
                    dueDate: new Date(taskData.dueDate).toISOString(),
                    todoCheckList: todoList,
                }
            );

            toast.success("Task updated successfully! ✅");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Update task error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to update task. Please try again.");
            throw error;
        }
    };

    const deleteTask = async () => {
        try {
            setLoading(true);

            await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

            toast.success("Task deleted successfully! 🗑️");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Delete task error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to delete task.");
        } finally {
            setLoading(false);
            setOpenDeleteAlert(false);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);

        try {
            if (taskId) {
                await updateTask();
            } else {
                await createTask();
            }
        } catch (err) {
            console.error("Submit error:", err);
        } finally {
            setLoading(false);
        }
    };

    //get Task info by id
    const getTaskDetailsById = async () => {
        try {
            setPageLoading(true); // Show skeleton while loading

            const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));

            if (response.data) {
                const taskInfo = response.data;
                setCurrentTask(taskInfo);

                setTaskData((prevState) => ({
                    title: taskInfo.title,
                    description: taskInfo.description,
                    priority: taskInfo.priority,
                    dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD") : null,
                    assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
                    todoCheckList: taskInfo?.todoCheckList?.map((item) => item?.text) || [],
                    attachments: taskInfo?.attachments || []
                }));
            }
        } catch (error) {
            console.error("Get task details error:", error);
            toast.error("Failed to get task details.");
        } finally {
            setPageLoading(false); // Hide skeleton after loading
        }
    }

    useEffect(() => {
        if (taskId) {
            getTaskDetailsById(taskId);
        }
        return () => { };
    }, [taskId]);

    // Check if form is valid for submit button
    const isFormValid = taskData.title.trim() &&
        taskData.description.trim() &&
        taskData.priority.trim() &&
        taskData.dueDate.trim() &&
        taskData.assignedTo?.length > 0 &&
        taskData.todoCheckList?.length > 0;

    return (
        <DashboardLayout activeMenu="Create Task">
            <div className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Show Skeleton while loading task details */}
                    {pageLoading ? (
                        <TaskFormSkeleton />
                    ) : (
                        <div className="form-card col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm">

                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b">
                                <h2 className="text-base md:text-lg font-semibold text-slate-800">
                                    {taskId ? "Update Task" : "Create Task"}
                                </h2>

                                {taskId && (
                                    <button
                                        type="button"
                                        onClick={() => setOpenDeleteAlert(true)}
                                        className="flex items-center gap-1.5 text-sm font-medium text-rose-500 bg-rose-100 rounded px-2 py-1 border border-rose-200 hover:bg-rose-200 transition-colors"
                                    >
                                        <LuTrash2 className="text-base" />
                                        Delete
                                    </button>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4">

                                {/* Title */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-600">
                                        Task Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className={`form-input ${errors.title ? 'border-red-500' : ''
                                            }`}
                                        placeholder="Create APP UI/UX etc."
                                        value={taskData.title}
                                        onChange={(e) =>
                                            handleValueChange("title", e.target.value)
                                        }
                                        maxLength={100}
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                                    )}
                                    <p className="text-xs text-slate-400">{taskData.title.length}/100</p>
                                </div>

                                {/* Description */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-600">
                                        Task Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className={`form-input resize-none ${errors.description ? 'border-red-500' : ''
                                            }`}
                                        rows={4}
                                        placeholder="Task Description"
                                        value={taskData.description}
                                        onChange={(e) =>
                                            handleValueChange("description", e.target.value)
                                        }
                                        maxLength={500}
                                    />
                                    {errors.description && (
                                        <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                                    )}
                                    <p className="text-xs text-slate-400">{taskData.description.length}/500</p>
                                </div>

                                {/* Priority & Due Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-600">
                                            Priority <span className="text-red-500">*</span>
                                        </label>
                                        <SelectDropdown
                                            options={PRIORITY_DATA}
                                            value={taskData.priority}
                                            onChange={(value) =>
                                                handleValueChange("priority", value)
                                            }
                                            placeholder="Select Priority"
                                        />
                                        {errors.priority && (
                                            <p className="text-xs text-red-500 mt-1">{errors.priority}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-600">
                                            Due Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className={`form-input ${errors.dueDate ? 'border-red-500' : ''
                                                }`}
                                            value={taskData.dueDate}
                                            onChange={(e) =>
                                                handleValueChange("dueDate", e.target.value)
                                            }
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.dueDate && (
                                            <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Assigned Users */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-600">
                                        Assigned To <span className="text-red-500">*</span>
                                    </label>
                                    <SelectUsers
                                        selectedUsers={taskData.assignedTo}
                                        setSelectedUsers={(value) =>
                                            handleValueChange("assignedTo", value)
                                        }
                                    />
                                    {errors.assignedTo && (
                                        <p className="text-xs text-red-500 mt-1">{errors.assignedTo}</p>
                                    )}
                                </div>

                                {/* TODO Checklist */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-600">
                                        TODO Checklist <span className="text-red-500">*</span>
                                    </label>
                                    <TodoListInput
                                        todoList={taskData.todoCheckList}
                                        setTodoList={(value) =>
                                            handleValueChange("todoCheckList", value)
                                        }
                                    />
                                    {errors.todoCheckList && (
                                        <p className="text-xs text-red-500 mt-1">{errors.todoCheckList}</p>
                                    )}
                                </div>

                                {/* Attachments */}
                                <div className="mt-3">
                                    <label className="text-sm font-medium text-slate-600">
                                        Add Attachments
                                    </label>
                                    <AddAttachments
                                        attachments={taskData.attachments}
                                        setAttachments={(value) =>
                                            handleValueChange("attachments", value)
                                        }
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end gap-3 mt-7">
                                    {!taskId && hasUnsavedChanges && (
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                                            onClick={clearData}
                                        >
                                            Clear Draft
                                        </button>
                                    )}
                                    <button
                                        className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-all ${loading || !isFormValid
                                            ? 'bg-slate-400 cursor-not-allowed'
                                            : 'bg-blue-400 hover:bg-blue-500'
                                            }`}
                                        onClick={handleSubmit}
                                        disabled={loading || !isFormValid}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                PLEASE WAIT...
                                            </span>
                                        ) : (
                                            taskId ? "UPDATE TASK" : "CREATE TASK"
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {openDeleteAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">Delete Task</h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Are you sure you want to delete this task? This action cannot be undone.
                                </p>
                            </div>
                            <button
                                onClick={() => setOpenDeleteAlert(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <LuX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setOpenDeleteAlert(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteTask}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300"
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete Task"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default CreateTask;