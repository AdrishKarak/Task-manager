import React from 'react';

const Progress = ({ progress, status }) => {
    const getColor = () => {
        switch (status) {
            case "In Progress":
                return "bg-cyan-600";
            case "Completed":
                return "bg-green-600";
            default:
                return "bg-violet-600";
        }
    };

    const safeProgress = Math.min(Math.max(progress || 0, 0), 100);

    return (
        <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
            <div
                className={`${getColor()} h-2 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${safeProgress}%` }}
            />
        </div>
    );
};

export default Progress;