import React from 'react';
import Progress from '../Progress';
import AvatarGroup from '../AvatarGroup';
import { LuPaperclip } from 'react-icons/lu';
import moment from "moment";

const TaskCard = ({
    title,
    description,
    status,
    priority,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachmentCount,
    completedTodoCount,
    todoChecklist,
    onClick
}) => {
    const getStatusTagColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-600 bg-cyan-100 border-cyan-500/10";
            case "Completed":
                return "text-green-600 bg-green-100 border-green-500/10";
            default:
                return "text-violet-600 bg-violet-100 border-violet-500/10";
        }
    };

    const getPriorityTagColor = () => {
        switch (priority) {
            case "Low":
                return "text-emerald-500 bg-emerald-100 border-emerald-500/10";
            case "Medium":
                return "text-amber-500 bg-amber-100 border-amber-500/10";
            default:
                return "text-rose-500 bg-rose-100 border-rose-500/10";
        }
    };

    const getBorderColor = () => {
        switch (status) {
            case "In Progress":
                return "border-cyan-600";
            case "Completed":
                return "border-green-600";
            default:
                return "border-violet-600";
        }
    };

    return (
        <div
            className='bg-white rounded-xl py-4 shadow-md shadow-gray-200 cursor-pointer border border-gray-200/50 hover:shadow-lg hover:shadow-gray-300 transition-all duration-200'
            onClick={onClick}
        >
            <div className='flex items-center gap-2 px-4'>
                <div className={`text-[11px] font-medium ${getStatusTagColor()} px-3 py-1 rounded-md border`}>
                    {status || 'Pending'}
                </div>
                <div className={`text-[11px] font-medium ${getPriorityTagColor()} px-3 py-1 rounded-md border`}>
                    {priority || 'Low'} Priority
                </div>
            </div>

            <div className={`px-4 mt-3 border-l-[3px] ${getBorderColor()}`}>
                <p className='text-sm font-semibold text-gray-800 mt-2 line-clamp-2'>
                    {title || 'Untitled Task'}
                </p>
                <p className='text-xs text-gray-500 mt-2 line-clamp-2 leading-[18px]'>
                    {description || 'No description available'}
                </p>
                <p className='text-[13px] text-gray-600 mt-3 font-medium mb-2 leading-[18px]'>
                    Task Done: {" "}
                    <span className='font-semibold text-gray-800'>
                        {completedTodoCount || 0}/{todoChecklist?.length || 0}
                    </span>
                </p>
                <Progress progress={progress || 0} status={status} />
            </div>

            <div className='px-4 mt-4'>
                <div className='flex items-center justify-between mb-3'>
                    <div>
                        <label className='text-xs text-gray-500 font-medium'>
                            Start Date
                        </label>
                        <p className='text-[13px] font-semibold text-gray-900 mt-0.5'>
                            {createdAt ? moment(createdAt).format("DD MMM YYYY") : 'N/A'}
                        </p>
                    </div>
                    <div className='text-right'>
                        <label className='text-xs text-gray-500 font-medium'>
                            Due Date
                        </label>
                        <p className='text-[13px] font-semibold text-gray-900 mt-0.5'>
                            {dueDate ? moment(dueDate).format("DD MMM YYYY") : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                    <AvatarGroup avatars={assignedTo || []} />
                    {attachmentCount > 0 && (
                        <div className='flex items-center gap-1.5 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100'>
                            <LuPaperclip className='text-primary text-sm' />
                            <span className='text-xs font-medium text-gray-900'>
                                {attachmentCount}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;