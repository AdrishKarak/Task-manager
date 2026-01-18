import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegends from './CustomLegends';


const COLORS = ["#8D51FF", "#00BBDB", "#7BCE00"];

const CustomPieChart = ({ data = [], color = COLORS }) => {
    return (
        <ResponsiveContainer width="100%" height={325}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={130}
                    innerRadius={100}
                    dataKey="count"
                    nameKey="status"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={color[index % color.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegends />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
