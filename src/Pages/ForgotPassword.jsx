import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, Link } from 'react-router-dom';
function ForgotPassword() {
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let response = axiosInstance.post("user/reset", { email: email });

            toast.promise(response, {
                loading: "Sending link to Reset Password",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to send reset link"
            });

            response = await response;
            // //console.log(response)
            setShow(true);
        }

        catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div className="text-black flex flex-col  items-center justify-center h-[100vh]">
            <form noValidate onSubmit={handleSubmit} className="relative flex flex-col justify-center gap-3 rounded-lg p-4  w-96 shadow-[0_0_10px_black]">
                <Link className="absolute top-8 text-2xl link text-accent cursor-pointer" onClick={() => navigator(-1)}>
                    <AiOutlineArrowLeft />
                </Link>
                <h1 className='mb-5 text-center text-2xl font-bold'>Forgot Password?</h1>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input type="email" required name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email..' className='bg-transparent px-2 py-1 border' />
                </div>
                <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 mt-2'>
                    Submit
                </button>
            </form>

            {
                show && (
                    <p className=' text-xl mt-5'>Password Reset Link has been sent to {email}</p>
                )
            }

        </div>
    )
}

export default ForgotPassword