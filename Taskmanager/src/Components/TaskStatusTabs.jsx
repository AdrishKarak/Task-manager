import React from 'react';

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className='my-2'>
            <div className='flex items-center gap-1 bg-gray-50 rounded-lg p-1'>
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={`relative px-3 md:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === tab.label
                                ? 'text-primary bg-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                            }`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        <div className='flex items-center gap-2'>
                            <span className='text-sm'>{tab.label}</span>
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${activeTab === tab.label
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {tab.count}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskStatusTabs;