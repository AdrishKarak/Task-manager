import React from "react";
import defaultAvatar from "../../assets/panda.png";
import StatCard from "./StatCard";

const UserCard = ({ userInfo }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all duration-200">

            {/* Header */}
            <div className="flex items-center gap-4">
                <img
                    src={userInfo?.profileImageUrl || defaultAvatar}
                    alt={userInfo?.name || "User avatar"}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm"
                />

                <div className="min-w-0">
                    <h2 className="text-base font-semibold text-slate-800 truncate">
                        {userInfo?.name || "Unknown User"}
                    </h2>
                    <p className="text-sm text-slate-500 truncate">
                        {userInfo?.email || "No email available"}
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-3 mt-6">
                <StatCard
                    label="Pending"
                    count={userInfo?.pendingTasks || 0}
                    status="Pending"
                />
                <StatCard
                    label="In Progress"
                    count={userInfo?.inProgressTasks || 0}
                    status="In Progress"
                />
                <StatCard
                    label="Completed"
                    count={userInfo?.completedTasks || 0}
                    status="Completed"
                />
            </div>
        </div>
    );
};

export default UserCard;
