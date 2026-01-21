import React, { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { LuUsers } from "react-icons/lu";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.log("Error fetching users", error);
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

    const selectedUserAvatars = allUsers.filter((user) => selectedUsers.includes(user._id)).map((user) => user.profileImageurl);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }

        return () => { };

    }, [selectedUsers]);

    return (
        <div className="space-y-4 mt-2">
            {selectedUserAvatars.length === 0 && (
                <button className="card-btn" onClick={() => setIsModalOpen(true)}>
                    <LuUsers className="text-sm" /> Add Members
                </button>
            )}
        </div>
    );
};

export default SelectUsers;
