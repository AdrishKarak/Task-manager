import React, { useState } from 'react'
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, type, label }) => {
      const [showPassword, setShowPassword] = useState(false);

      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      }

  return (
    <div>
        {label && <label className='text-slate-800 text-[13px]'>{label}</label>}

        <div className='input-box'>
            <input 
                type={type === "password" ? (showPassword ? "text" : "password") : type} 
                value={value}
                placeholder={placeholder} 
                className='w-full bg-transparent outline-none' 
                onChange={(e) => onChange(e)} 
            />
           
           {type === "password" && (
            <>
            { showPassword ? (
                <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} />
            ) : (
                <FaRegEye size={22} className="text-blue-400 cursor-pointer" onClick={toggleShowPassword} />
            )}
            </>
           )}

        </div>
    </div>
  )
}

export default Input

