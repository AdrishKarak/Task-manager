import React from 'react';
import moment from 'moment';

const TaskListTable = ({ tableData }) => {
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-purple-200 text-purple-500 border border-purple-200';
            case 'In Progress':
                return 'bg-Cyan-200 text-Cyan-500 border border-Cyan-200';
            case 'Completed':
                return 'bg-green-200 text-green-500 border border-green-200';
            default:
                return 'bg-gray-200 text-gray-500 border border-gray-200';
        }
    };

    const getpriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'Low':
                return 'bg-green-200 text-green-500 border border-green-200';
            case 'Medium':
                return 'bg-yellow-200 text-yellow-500 border border-yellow-200';
            case 'High':
                return 'bg-red-200 text-red-500 border border-red-200';
            default:
                return 'bg-gray-200 text-gray-500 border border-gray-200';
        }
    }

    return (
        <div className='overflow-x-auto p-0 rounded-lg mt-3'>
            <table className='min-w-full'>
                <thead>
                    <tr className='text-left'>
                        <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Name</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Status</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Priority</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell'>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((task) => (
                        <tr key={task._id} className='border-t border-gray-200'>
                            <td className='my-3 mx-4 text-gray-700 text-[13px] line-clamp-1 overflow-hidden'>{task.title}</td>
                            <td className='px-4 py-4'><span className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>{task.status}</span></td>
                            <td className='px-4 py-4'><span className={`px-2 py-1 text-xs rounded inline-block ${getpriorityBadgeColor(task.priority)}`}>{task.priority}</span></td>
                            <td className='px-4 py-4 hidden md:table-cell text-nowrap text-gray-700 text-[13px]'>{task.createdAt ? moment(task.createdAt).format('DD-MM-YYYY') : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TaskListTable;   