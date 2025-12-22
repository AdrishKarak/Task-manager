import React, { useState } from 'react';
import AuthLayout from '../../Components/layouts/AuthLayout';

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState(' ');
    const [error, setError] = useState(null);


    return (
        <AuthLayout>
            <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center' >
                <h3 className='text-xl font-semibold text-slate-900' >Create an Account</h3>
                <p className='text-slate-700 mt-[5px] mb-5' >Join our community and start managing your tasks today!</p>
            </div>

        </AuthLayout>
    );
};

export default Signup;