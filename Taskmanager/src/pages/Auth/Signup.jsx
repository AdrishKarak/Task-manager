import React, { useState } from 'react';
import AuthLayout from '../../Components/layouts/AuthLayout';

const Signup = () => {
const [profilePic , setProfilePic] = useState(null);
const [fullName , setFullName] = useState("");
const [email , setEmail] = useState("");
const [password, setPassword] = useState("");
const [adminInviteToken , setAdminInviteToken] = useState(' ');
const [error, setError] = useState(null);


    return (
        <AuthLayout>

        </AuthLayout>
    );
};

export default Signup;