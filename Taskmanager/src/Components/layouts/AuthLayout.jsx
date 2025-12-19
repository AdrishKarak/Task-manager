import React from 'react';
import UiImg from "../../assets/auth.png"

const AuthLayout = ({ children }) => {
    return <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <div className='flex items-center gap-2 mb-4'>
                <img src="/favicon.svg" alt="Logo" className='w-8 h-8' />
                <h2 className='text-lg font-medium text-black'>Task Manager</h2>
            </div>
            {children}
        </div>
        <div className='hidden md:flex w-[50vw] h-screen items-center justify-center bg-blue-300' >
            <img src={UiImg} alt="Authentication" className='max-w-full max-h-full object-contain' />
        </div>
    </div>
};

export default AuthLayout;