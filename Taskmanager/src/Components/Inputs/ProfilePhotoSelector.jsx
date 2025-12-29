import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //Update the image state
            setImage(file);

            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input type="file" ref={inputRef} accept="image/*" onChange={handleImageChange} className='hidden' />
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full relative cursor-pointer' >
                    <LuUser className='text-4xl text-blue-400' />
                    <button onClick={onChooseFile} className='w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer ' type='button'>
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative' >
                    <img src={previewUrl} alt="" className='w-20 h-20 rounded-full object-cover' />
                    <button onClick={handleRemoveImage} className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer ' type='button'>
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
