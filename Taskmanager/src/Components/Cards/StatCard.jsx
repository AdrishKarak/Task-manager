import React from "react";

const StatCard = ({ label, count, status }) => {
    const getStyles = () => {
        switch (status) {
            case "In Progress":
                return {
                    bg: "bg-cyan-50",
                    text: "text-cyan-700",
                    ring: "ring-cyan-100",
                };
            case "Completed":
                return {
                    bg: "bg-green-50",
                    text: "text-green-700",
                    ring: "ring-green-100",
                };
            default:
                return {
                    bg: "bg-violet-50",
                    text: "text-violet-700",
                    ring: "ring-violet-100",
                };
        }
    };

    const styles = getStyles();

    return (
        <div
            className={`rounded-xl p-3 ${styles.bg} ${styles.text} ring-1 ${styles.ring} flex flex-col justify-center`}
        >
            <span className="text-xl font-bold leading-none">{count}</span>
            <span className="text-xs font-medium mt-1 opacity-80">{label}</span>
        </div>
    );
};

export default StatCard;
