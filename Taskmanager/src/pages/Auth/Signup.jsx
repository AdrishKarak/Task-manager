import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from '../../Components/layouts/AuthLayout';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../utils/helper';

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //Handle SignUp form submit 
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullName) {
            setError("Please enter your full name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");

        //SignUp API call
    }


    return (
        <AuthLayout>
            <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center' >
                <h3 className='text-xl font-semibold text-slate-900' >Create an Account</h3>
                <p className='text-slate-700 mt-[5px] mb-5' >Join our community and start managing your tasks today!</p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name" placeholder='John Doe' type='text' />

                        <Input value={email} onChange={(e) => setEmail(e.target.value)}
                            label="Email address" placeholder='adrish@example.com' type='text' />

                        <Input value={password} onChange={(e) => setPassword(e.target.value)}
                            label="Password " placeholder='Min 8 characters' type='password' />

                        <Input value={password} onChange={(e) => setPassword(e.target.value)}
                            label="Admin only invite token " placeholder='Min 6 Digit code' type='text' />
                    </div>

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-primary'>
                        SIGNUP
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account ? {" "}
                        <Link className='font-medium text-blue-400 underline' to="/login">Login</Link>
                    </p>


                </form>
            </div>

        </AuthLayout>
    );
};

export default Signup;