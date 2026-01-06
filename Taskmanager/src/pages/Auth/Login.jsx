import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from '../../Components/layouts/AuthLayout';
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    //Handle Login form submit 
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");

        //Login API call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);

                //Redirect based on role
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong");
            }
        }
    }
    return <AuthLayout>
        <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
            <h3 className='text-xl font-semibold text-black' >Welcome back</h3>
            <p className='text-xl text-slate-700 mt-[5px] mb-6' >
                Please enter your details to login
            </p>
            <form onSubmit={handleLogin}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)}
                    label="Email address" placeholder='adrish@example.com' type='text' />

                <Input value={password} onChange={(e) => setPassword(e.target.value)}
                    label="Password " placeholder='Min 8 characters' type='password' />

                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button type='submit' className='btn-primary'>
                    LOGIN
                </button>

                <p className='text-[13px] text-slate-800 mt-3'>
                    Don't have an account ? {" "}
                    <Link className='font-medium text-blue-400 underline' to="/signup">Signup</Link>
                </p>

            </form>

        </div>

    </AuthLayout>
};

export default Login;