import React, { useState } from "react";
import DashboardLayout from "../../Components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosinstance";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../Components/Inputs/SelectDropdown";
import SelectUsers from "../../Components/Inputs/SelectUsers";

const CreateTask = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { taskId } = location.state || {};

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "", // FIXED
        assignedTo: [],
        attachments: [],
        todoCheckList: [],
    });

    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleValueChange = (key, value) => {
        setTaskData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <DashboardLayout activeMenu="Create Task">
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <div className="form-card col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-base md:text-lg font-semibold text-slate-800">
                                {taskId ? "Update Task" : "Create Task"}
                            </h2>

                            {taskId && (
                                <button
                                    onClick={() => setOpenDeleteAlert(true)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-rose-500 bg-rose-100 rounded px-2 py-1 border border-rose-200 hover:bg-rose-200"
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
                                    Task Title
                                </label>
                                <input
                                    placeholder="Create APP UI/UX etc."
                                    className="form-input"
                                    value={taskData.title}
                                    onChange={(e) =>
                                        handleValueChange("title", e.target.value)
                                    }
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-600">
                                    Task Description
                                </label>
                                <textarea
                                    placeholder="Task Description"
                                    className="form-input resize-none"
                                    rows={4}
                                    value={taskData.description}
                                    onChange={(e) =>
                                        handleValueChange("description", e.target.value)
                                    }
                                />
                            </div>

                            {/* Priority & Due Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-600">
                                        Priority
                                    </label>
                                    <SelectDropdown
                                        options={PRIORITY_DATA}
                                        value={taskData.priority}
                                        onChange={(value) =>
                                            handleValueChange("priority", value)
                                        }
                                        placeholder="Select Priority"
                                    />
                                </div>

                                <div className="space-y-1 ml-7 ">
                                    <label className="text-sm font-medium text-slate-600">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={taskData.dueDate}
                                        onChange={(e) =>
                                            handleValueChange("dueDate", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-3">
                                    <label className="text-sm font-medium text-slate-600"> Assigned To</label>
                                    <SelectUsers
                                        selectedUsers={taskData.assignedTo}
                                        setSelectedUsers={(value) => handleValueChange("assignedTo", value)} />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateTask;
