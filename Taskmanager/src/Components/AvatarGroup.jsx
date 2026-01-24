import React from "react";
import defaultAvatar from "../assets/panda.png";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {

    // Normalize avatars to always have a valid src
    const safeAvatars = avatars.map(
        (avatar) => avatar || defaultAvatar
    );

    return (
        <div className="flex items-center">
            {safeAvatars.slice(0, maxVisible).map((avatar, index) => (
                <img
                    key={index}
                    src={avatar}
                    alt={`avatar ${index + 1}`}
                    className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover bg-gray-200"
                />
            ))}

            {safeAvatars.length > maxVisible && (
                <span className="w-9 h-9 rounded-full bg-blue-100 text-sm font-medium border-2 border-white -ml-3 flex items-center justify-center">
                    +{safeAvatars.length - maxVisible}
                </span>
            )}
        </div>
    );
};

export default AvatarGroup;
