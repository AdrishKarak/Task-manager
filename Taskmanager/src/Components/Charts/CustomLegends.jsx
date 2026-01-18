import React from "react";

const CustomLegends = ({ payload }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
            {payload.map((entry, index) => (
                <div key={`item-${index}`} className="flex items-center space-x-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-700 font-medium">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegends;