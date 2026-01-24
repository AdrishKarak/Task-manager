import React, { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { LuUsers } from "react-icons/lu";
import Model from "../Model";
import AvatarGroup from "../AvatarGroup";
import defaultAvatar from "../../assets/panda.png";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (Array.isArray(response.data)) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    /**
     * IMPORTANT:
     * Always return one avatar per selected user.
     * Missing images fall back to defaultAvatar.
     */
    const selectedUserAvatars = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl || defaultAvatar);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }
    }, [selectedUsers]);

    return (
        <div className="space-y-4 mt-2">
            {selectedUserAvatars.length === 0 && (
                <button
                    className="card-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    <LuUsers className="text-sm" />
                    Add Members
                </button>
            )}

            {selectedUserAvatars.length > 0 && (
                <div
                    className="cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </div>
            )}

            <Model
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >
                <div className="space-y-4 h-[60vh] overflow-y-auto">
                    {allUsers.map((user) => (
                        <div
                            key={user._id}
                            className="flex items-center gap-4 p-3 border-b border-gray-200"
                        >
                            <img
                                src={user.profileImageUrl || defaultAvatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover bg-gray-200"
                            />

                            <div className="flex-1">
                                <p className="font-medium text-gray-800">
                                    {user.name}
                                </p>
                                <p className="text-gray-500 text-[13px]">
                                    {user.email}
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className="w-4 h-4 bg-gray-200 border-gray-400 rounded-sm outline-none"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="card-btn"
                        onClick={() => setIsModalOpen(false)}
                    >
                        CANCEL
                    </button>
                    <button
                        className="card-btn-fill"
                        onClick={handleAssign}
                    >
                        ASSIGN
                    </button>
                </div>
            </Model>
        </div>
    );
};

export default SelectUsers;
