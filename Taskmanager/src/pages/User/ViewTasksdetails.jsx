import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosinstance';
import moment from 'moment';
import defaultAvatar from "../../assets/panda.png";
import AvatarGroup from '../../Components/AvatarGroup';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const ViewTasksdetails = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);

    const getStatusTagColor = (status) => {
        switch (status) {
            case "In Progress":
                return "text-cyan-600 bg-cyan-100 border-cyan-500/10";
            case "Completed":
                return "text-green-600 bg-green-100 border-green-500/10";
            default:
                return "text-violet-600 bg-violet-100 border-violet-500/10";
        }
    };

    const getTaskDetailsById = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
            );
            if (response.data) {
                // Normalize the todoCheckList to only use 'completed' property
                const normalizedTask = {
                    ...response.data,
                    todoCheckList: response.data.todoCheckList?.map(item => ({
                        text: item.text,
                        completed: item.completed,
                        _id: item._id
                    }))
                };
                console.log("Fetched and normalized task:", normalizedTask);
                setTask(normalizedTask);
            }
        } catch (error) {
            console.log("Error fetching task details", error);
        }
    };

    const updateTodoCheckList = async (index) => {
        console.log("=== UPDATE TODO CHECKLIST START ===");
        console.log("Index:", index);
        console.log("Current task:", task);

        const todoCheckList = [...task?.todoCheckList];
        console.log("Todo checklist before toggle:", todoCheckList);

        if (todoCheckList && todoCheckList[index]) {
            // Toggle the 'completed' property to match the API
            const oldValue = todoCheckList[index].completed;
            todoCheckList[index].completed = !todoCheckList[index].completed;

            console.log(`Toggling index ${index} from ${oldValue} to ${todoCheckList[index].completed}`);

            // Optimistically update the UI immediately
            const updatedTask = { ...task, todoCheckList };
            console.log("Setting optimistic state:", updatedTask);
            setTask(updatedTask);

            try {
                console.log("Sending PUT request to:", API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId));
                console.log("Payload:", { todoCheckList });

                const response = await axiosInstance.put(
                    API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
                    { todoCheckList }
                );

                console.log("=== API RESPONSE ===");
                console.log("Status:", response.status);
                console.log("Full response:", response);
                console.log("Response data:", response.data);
                console.log("Response data type:", typeof response.data);
                console.log("Has task property?", 'task' in (response.data || {}));
                console.log("Has _id property?", '_id' in (response.data || {}));

                // If the API returns updated task data, use it
                if (response.status === 200 && response.data) {
                    // Check if response.data has the task object or is the task itself
                    if (response.data.task) {
                        console.log("Setting task from response.data.task");
                        // Normalize the todoCheckList to only use 'completed' property
                        const normalizedTask = {
                            ...response.data.task,
                            todoCheckList: response.data.task.todoCheckList?.map(item => ({
                                text: item.text,
                                completed: item.completed,
                                _id: item._id
                            }))
                        };
                        console.log("Normalized task:", normalizedTask);
                        setTask(normalizedTask);
                    } else if (response.data._id) {
                        console.log("Setting task from response.data (is task itself)");
                        // Normalize the todoCheckList to only use 'completed' property
                        const normalizedTask = {
                            ...response.data,
                            todoCheckList: response.data.todoCheckList?.map(item => ({
                                text: item.text,
                                completed: item.completed,
                                _id: item._id
                            }))
                        };
                        setTask(normalizedTask);
                    } else {
                        console.log("Keeping optimistic update (no task in response)");
                    }
                }
                console.log("=== UPDATE TODO CHECKLIST END ===");
            } catch (error) {
                console.error("=== ERROR UPDATING TODO ===");
                console.error("Error:", error);
                console.error("Error response:", error.response);
                // Revert the change on error
                todoCheckList[index].completed = !todoCheckList[index].completed;
                setTask({ ...task, todoCheckList });
            }
        } else {
            console.log("Invalid index or todoCheckList not found");
        }
    };

    const handleLinkClick = (link) => {
        if (!/^https?:\/\//i.test(link)) {
            link = "https://" + link;
        }
        window.open(link, "_blank");
    };

    useEffect(() => {
        if (taskId) getTaskDetailsById();
    }, [taskId]);

    return (
        <DashboardLayout activeMenu="My Tasks">
            <div className='mt-5'>
                {task && (
                    <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
                        <div className='form-card col-span-3'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-xl md:text-2xl font-semibold'>
                                    {task?.title}
                                </h2>
                                <div className={`text-[13px] ${getStatusTagColor(task?.status)} font-medium px-4 py-0.5 rounded`}>
                                    {task?.status}
                                </div>
                            </div>

                            <div className='mt-4'>
                                <InfoBox label="Description" value={task?.description} />
                            </div>

                            <div className='grid grid-cols-12 gap-4 mt-4'>
                                <div className='col-span-6 md:col-span-4'>
                                    <InfoBox label="Priority" value={task?.priority} />
                                </div>
                                <div className='col-span-6 md:col-span-4'>
                                    <InfoBox label="Due Date" value={task?.dueDate ? moment(task?.dueDate).format("DD-MM-YYYY") : "N/A"} />
                                </div>
                                <div className='col-span-6 md:col-span-4'>
                                    <label className='text-xs font-medium text-slate-500'>
                                        Assigned To
                                    </label>
                                    <AvatarGroup avatars={task?.assignedTo?.map((item) => item?.profileImageUrl) || [defaultAvatar]} />
                                </div>
                            </div>

                            <div className='mt-2'>
                                <label className='text-xs font-medium text-slate-500'>
                                    Todo CheckList
                                </label>
                                {task?.todoCheckList?.map((item, index) => (
                                    <TodoCheckList
                                        key={`todo_${item._id || index}_${item.completed}`}
                                        text={item?.text}
                                        isChecked={item?.completed}
                                        onChange={() => updateTodoCheckList(index)}
                                    />
                                ))}
                            </div>

                            {task?.attachments?.length > 0 && (
                                <div className='mt-2'>
                                    <label className='text-xs font-medium text-slate-500'>
                                        Attachments
                                    </label>

                                    {task?.attachments?.map((link, index) => (
                                        <Attachment
                                            key={`link_${index}`}
                                            link={link}
                                            index={index}
                                            onClick={() => handleLinkClick(link)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ViewTasksdetails;

const InfoBox = ({ label, value }) => (
    <>
        <label className='text-xs font-medium text-slate-500'>{label}</label>
        <p className='text-[13px] md:text-[16px] font-medium text-gray-700 mt-0.5'>
            {value}
        </p>
    </>
);

const TodoCheckList = ({ text, isChecked, onChange }) => {
    console.log("TodoCheckList rendering - text:", text, "isChecked:", isChecked);

    return (
        <div className='flex items-center gap-3 p-3'>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                    console.log("Checkbox clicked! Current checked:", e.target.checked);
                    onChange();
                }}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md outline-none cursor-pointer'
            />
            <p className='text-[12px] md:text-[14px] text-gray-800'>
                {text}
            </p>
        </div>
    );
};

const Attachment = ({ link, index, onClick }) => (
    <div
        className='flex justify-between bg-slate-100 border border-slate-200/45 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer hover:bg-slate-200/45'
        onClick={onClick}
    >
        <div className='flex-1 flex items-center gap-3'>
            <span className='text-xs text-gray-400 font-semibold mr-2'>
                {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            <p className='text-xs text-gray-700 font-medium'>{link}</p>
        </div>
        <LuSquareArrowOutUpRight className='text-gray-500' />
    </div>
);