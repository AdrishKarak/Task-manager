import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const CustomBarChart = ({ data }) => {

    const getBarColor = (entry) => {
        switch (entry?.priority) {
            case 'Low':
                return '#008450';
            case 'Medium':
                return '#EFB700';
            case 'High':
                return '#B81D13';
            default:
                return '#00BC7D';
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg border border-gray-300 p-2'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>
                        {payload[0].payload.priority}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Count: {" "}
                        <span className='text-sm font-medium text-gray-900'>
                            {payload[0].payload.count ?? 0}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />
                    <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />

                    <Bar
                        dataKey="count"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={getBarColor(entry)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
